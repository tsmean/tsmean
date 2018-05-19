import {Module} from '@nestjs/common';

import {AuthService} from './auth.service';
import {JwtStrategy} from './passport/jwt.strategy';
import {AuthController} from './auth.controller';
import {ConfigModule} from '../config/config.module';
import {UserModule} from '../user/user.module';
import {authProviders} from './auth.providers';
import {PasswordValidatorModule} from '../validation/password/password-validator.module';
import {EmailValidatorModule} from '../validation/email/email-validator.module';
import {AuthGuard} from './auth.guard';

@Module({
  imports: [ConfigModule, UserModule, PasswordValidatorModule, EmailValidatorModule],
  components: [AuthService, AuthGuard, JwtStrategy, ...authProviders],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard]
})
export class AuthModule {}
