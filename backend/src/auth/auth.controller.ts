import {Body, Controller, HttpStatus, Post, Res, UseGuards, UseInterceptors, Inject, BadRequestException} from '@nestjs/common';
import {classToPlain} from 'class-transformer';

import {UserService} from '../user/user.service';
import {LoggingInterceptor} from '../common/interceptors/logging.interceptor';
import {TransformInterceptor} from '../common/interceptors/transform.interceptor';
import {apiPath} from '../api';
import {LoginDto} from '../../../shared/src/dto/user/login.dto';
import {AuthService} from './auth.service';
import {PASSWORD_CRYPTOGRAPHER_TOKEN} from './constants';
import {PasswordCryptographerService} from './password-cryptographer/password-cryptographer.interface';

@Controller(apiPath(1, 'auth'))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    @Inject(PASSWORD_CRYPTOGRAPHER_TOKEN) private readonly passwordCryptographerService: PasswordCryptographerService
  ) {}

  @Post()
  async login(@Body() req: LoginDto) {
    const user = await this.userService.findOneByEmail(req.email);

    if (!user || !await this.passwordCryptographerService.doCompare(req.password, user.password.hash)) {
      throw new BadRequestException('Invalid email or password!');
    }

    const token = this.authService.createToken(classToPlain(user));
    return {
      user,
      token
    };
  }
}
