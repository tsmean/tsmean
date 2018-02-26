import {Module, NestModule, RequestMethod} from '@nestjs/common';
import {MiddlewaresConsumer} from '@nestjs/common/interfaces/middlewares';
import * as passport from 'passport';

import {UserController} from './user.controller';
import {UserService} from './user.service';
import {userProviders} from './user.providers';
import {PasswordCryptographerServiceImpl} from '../auth/password-cryptographer/password-cryptographer';
import {PASSWORD_CRYPTOGRAPHER_TOKEN} from '../auth/constants';
import {DatabaseModule} from '../database/database.module';
import {LoggerModule} from '../logger/logger.module';
import {EmailValidatorModule} from '../validation/email/email-validator.module';
import {apiPath} from '../api';
import {AuthMiddleware} from '../auth/auth.middleware';
import {PasswordValidatorModule} from '../validation/password/password-validator.module';

@Module({
  controllers: [UserController],
  components: [
    ...userProviders,
    {
      provide: PASSWORD_CRYPTOGRAPHER_TOKEN,
      useClass: PasswordCryptographerServiceImpl
    },
    UserService
  ],
  exports: [UserService],
  modules: [PasswordValidatorModule, EmailValidatorModule, DatabaseModule, LoggerModule]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(AuthMiddleware)
      .with({excludedPath: apiPath(1, 'users'), method: RequestMethod.POST})
      .forRoutes(UserController);
  }
}
