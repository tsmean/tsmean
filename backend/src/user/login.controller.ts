import {Body, Controller, HttpStatus, Post, Res, UseGuards, UseInterceptors} from '@nestjs/common';

import {UserService} from './user.service';
import {RolesGuard} from '../common/guards/roles.guard';
import {LoggingInterceptor} from '../common/interceptors/logging.interceptor';
import {TransformInterceptor} from '../common/interceptors/transform.interceptor';
import {EmailValidatorImpl} from '../validation/email/email-validator.component';
import {apiPath} from '../api';

@Controller(apiPath(1, 'login'))
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class UserController {
  constructor(private readonly userService: UserService, private readonly emailValidator: EmailValidatorImpl) {}

  @Post()
  async login(
    @Body()
    req: {
      username: string;
      password: string;
    },
    @Res() res
  ) {
    console.log(req);
  }
}
