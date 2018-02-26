import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  Param,
  Res,
  Put,
  Delete,
  Patch,
  InternalServerErrorException,
  ForbiddenException,
  ParseIntPipe,
  Query,
  UnauthorizedException,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import {FindManyOptions} from 'typeorm';
import {DeepPartial} from 'typeorm/common/DeepPartial';

import {UserService} from './user.service';
import {AuthGuard} from '../common/guards/auth.guard';
import {Authorized} from '../common/decorators/authorized.decorator';
import {LoggingInterceptor} from '../common/interceptors/logging.interceptor';
import {TransformInterceptor} from '../common/interceptors/transform.interceptor';
import {User} from './user.entity';
import {CreateUserDto} from '@tsmean/shared';
import {EmailValidatorImpl} from '../validation/email/email-validator.component';
import {apiPath} from '../api';
import {UserRole} from './user.role';
import {CurrentUser} from './user.decorator';
import { PasswordValidatorImpl } from '../validation/password/password-validator.component';

@Controller(apiPath(1, 'users'))
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailValidator: EmailValidatorImpl,
    private readonly passwordValidator: PasswordValidatorImpl
  ) {}

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
      const data = await this.userService.create(requestBody.user, requestBody.password);
      return {
        message: 'Created',
        status: 201,
        data: data
      };
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

  @Get('current')
  @Authorized()
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
