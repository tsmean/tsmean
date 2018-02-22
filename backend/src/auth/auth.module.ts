import * as passport from 'passport';
import {Module, NestModule, MiddlewaresConsumer, RequestMethod} from '@nestjs/common';

import {AuthService} from './auth.service';
import {JwtStrategy} from './passport/jwt.strategy';
import {AuthController} from './auth.controller';
import {ConfigModule} from '../config/config.module';
import {UserModule} from '../user/user.module';
import {authProviders} from './auth.providers';

@Module({
  imports: [ConfigModule, UserModule],
  components: [AuthService, JwtStrategy, ...authProviders],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
