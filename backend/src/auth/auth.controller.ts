import {BadRequestException, Body, Controller, Inject, Post, UseInterceptors} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {classToPlain} from 'class-transformer';

import {UserService} from '../user/user.service';
import {LoggingInterceptor} from '../common/interceptors/logging.interceptor';
import {TransformInterceptor} from '../common/interceptors/transform.interceptor';
import {apiPath} from '../api';
import {AuthService} from './auth.service';
import {PASSWORD_CRYPTOGRAPHER_TOKEN} from './constants';
import {PasswordCryptographerService} from './password-cryptographer/password-cryptographer.interface';
import {EmailValidatorImpl} from '../validation/email/email-validator.component';
import {PasswordValidatorImpl} from '../validation/password/password-validator.component';
import {LoginDto} from '@tsmean/shared';

@ApiUseTags('Users')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
@Controller(apiPath(1, 'auth'))
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    @Inject(PASSWORD_CRYPTOGRAPHER_TOKEN) private readonly passwordCryptographerService: PasswordCryptographerService,
    private readonly emailValidator: EmailValidatorImpl,
    private readonly passwordValidator: PasswordValidatorImpl
  ) {
  }

  @ApiOperation({title: 'Authorize'})
  @ApiResponse({
    status: 200,
    description: 'Credentials are ok, returning JWT.'
  })
  @ApiResponse({status: 400, description: 'The email or password is incorrect!'})
  @Post()
  async login(@Body() req: LoginDto) {
    const emailValidation = await this.emailValidator.validateEmail(req.email);
    if (!emailValidation.isValid) {
      throw new BadRequestException('Invalid email!');
    }
    const passwordValidation = await this.passwordValidator.validatePassword(req.password);
    if (!emailValidation.isValid) {
      throw new BadRequestException('Invalid password!');
    }

    const user = await this.userService.findOneByEmail(req.email);

    if (!user || !await this.passwordCryptographerService.doCompare(req.password, user.password.hash)) {
      throw new BadRequestException('Incorrect email or password!');
    }

    const token = this.authService.createToken(classToPlain(user));
    return {
      user,
      token
    };
  }
}
