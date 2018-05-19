import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseInterceptors
} from '@nestjs/common';
import {FindManyOptions} from 'typeorm';
import {DeepPartial} from 'typeorm/common/DeepPartial';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';

import {UserService} from './user.service';
import {Authorized} from '../common/decorators/authorized.decorator';
import {LoggingInterceptor} from '../common/interceptors/logging.interceptor';
import {TransformInterceptor} from '../common/interceptors/transform.interceptor';
import {User} from './user.entity';
import {CreateUserDto} from '@tsmean/shared';
import {EmailValidatorImpl} from '../validation/email/email-validator.component';
import {apiPath} from '../api';
import {UserRole} from './user.role';
import {CurrentUser} from './user.decorator';
import {PasswordValidatorImpl} from '../validation/password/password-validator.component';

@ApiUseTags('Users')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
@Controller(apiPath(1, 'users'))
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailValidator: EmailValidatorImpl,
    private readonly passwordValidator: PasswordValidatorImpl
  ) {}

  @ApiOperation({title: 'Register new account'})
  @ApiResponse({
    status: 200,
    description: 'Credentials are ok, returning new user data.',
    type: User
  })
  @ApiResponse({status: 400, description: 'Email or password are not valid!'})
  @Post()
  async create(@Body() requestBody: CreateUserDto) {
    const emailValidation = await this.emailValidator.validateEmail(requestBody.user.email);
    if (!emailValidation.isValid) {
      throw new BadRequestException('Invalid email!');
    }
    const passwordValidation = await this.passwordValidator.validatePassword(requestBody.password);
    if (!emailValidation.isValid) {
      throw new BadRequestException('Invalid password!');
    }

    try {
      return await this.userService.create(requestBody.user, requestBody.password);
    } catch (err) {
      if (err.message === 'User already exists') {
        throw new ForbiddenException(err.message);
      } else {
        throw new InternalServerErrorException(err.message);
      }
    }
  }

  @Get()
  @Authorized(UserRole.Admin)
  async find(@Query() findOptions?: FindManyOptions<User>): Promise<User[]> {
    const options = {
      take: 100,
      skip: 0,
      ...findOptions // overwrite default ones
    };
    return this.userService.find(options);
  }

  @ApiBearerAuth()
  @ApiOperation({title: 'Get the current user info (check JWT validity)'})
  @ApiResponse({
    status: 200,
    description: 'JWT is ok, returning user data.',
    type: User
  })
  @ApiResponse({status: 401, description: 'JWT is no longer valid!'})
  @Authorized()
  @Get('current')
  async getCurrent(@CurrentUser() currentUser: User): Promise<User> {
    return await this.userService.findOneById(currentUser.id);
  }

  /**
   * Duck-Typed Input: could either be an integer for the id or the e-mail address of the user
   */
  @Get(':idOrEmail')
  @Authorized()
  async findOne(@Param('idOrEmail') idOrEmail, @CurrentUser() currentUser: User): Promise<User> {
    const isEmail = this.emailValidator.simpleCheck(idOrEmail);
    const foundUser = isEmail
      ? await this.userService.findOneByEmail(idOrEmail)
      : await this.userService.findOneById(parseInt(idOrEmail, 10));

    if ((!foundUser || foundUser.id !== currentUser.id) && currentUser.role !== UserRole.Admin) {
      throw new ForbiddenException('Only user can get info of himself (or admin)!');
    }

    if (!foundUser) {
      throw new NotFoundException(`User '${idOrEmail}' has not been found`);
    }

    return foundUser;
  }

  @Put()
  @Authorized()
  async fullUpdate(@Body() user: User, @CurrentUser() currentUser: User) {
    if (user.id !== currentUser.id && currentUser.role !== UserRole.Admin) {
      throw new ForbiddenException('Only user can update himself (or admin)!');
    }
    return this.userService.update(user.id, user);
  }

  @Patch(':id')
  @Authorized()
  async partialUpdate(
    @Param('id', new ParseIntPipe())
    userId: number,
    @Body() partialEntry: DeepPartial<User>,
    @CurrentUser() currentUser: User
  ) {
    if (userId !== currentUser.id && currentUser.role !== UserRole.Admin) {
      throw new ForbiddenException('Only user can update himself (or admin)!');
    }
    return this.userService.update(userId, partialEntry);
  }

  @Delete(':id')
  @Authorized()
  async remove(
    @Param('id', new ParseIntPipe())
    userId: number,
    @CurrentUser() currentUser: User
  ) {
    if (userId !== currentUser.id && currentUser.role !== UserRole.Admin) {
      throw new ForbiddenException('Only user can delete himself (or admin)!');
    }
    return this.userService.remove(userId);
  }
}
