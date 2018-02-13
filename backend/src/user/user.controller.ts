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
} from '@nestjs/common';
import { UserService } from './user.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import {User} from './user.entity';
import {CreateUserDto} from '@tsmean/shared';
import {FindManyOptions} from 'typeorm';
import {EmailValidatorImpl} from '../validation/email/email-validator.component';
import {DeepPartial} from 'typeorm/common/DeepPartial';
import {apiPath} from '../api';

@Controller(apiPath(1, 'users'))
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailValidator: EmailValidatorImpl
  ) {}

  @Post()
  // @Roles('admin')
  async create(@Body() requestBody: CreateUserDto) {
    try {
      const data = await this.userService.create(requestBody.user, requestBody.password);
      return {
        message: 'Success',
        status: 200,
        data: data,
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
  // TODO: Only user can get info on himself or maybe admin
  async find(findOptions?: FindManyOptions<User>): Promise<User[]> {
    const options = {
      take: 100,
      skip: 0,
      ...findOptions, // overwrite default ones
    }
    return this.userService.find(options);
  }

  /**
   * Duck-Typed Input: could either be an integer for the id or the e-mail address of the user
   */
  @Get(':idOrEmail')
  // TODO: Only user can get info on himself or maybe admin
  findOne(@Param('idOrEmail') idOrEmail): Promise<User> {
    const isEmail = this.emailValidator.simpleCheck(idOrEmail);
    return isEmail ?
      this.userService.findOneByEmail(idOrEmail) :
      this.userService.findOneById(parseInt(idOrEmail, 10));
  }

  @Put()
  // TODO: Only user can update himself or maybe admin
  async fullUpdate(@Body() user: User) {
    return this.userService.update(user.id, user);
  }

  @Patch(':id')
  async partialUpdate(@Param('id', new ParseIntPipe()) id, partialEntry: DeepPartial<User>) {
    return this.userService.update(id, partialEntry);
  }

  @Delete(':id')
  // TODO: Only user can delete himself or maybe admin
  async remove(@Param('id', new ParseIntPipe()) id) {
    return this.userService.remove(id);
  }

}
