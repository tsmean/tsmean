import {Module, NestModule, RequestMethod} from '@nestjs/common';
import { UserController } from './user.controller';
import {PasswordCryptographerServiceImpl} from './password-cryptographer/password-cryptographer';
import {LocalStrategy} from './local.strategy';
import {MiddlewaresConsumer} from '@nestjs/common/interfaces/middlewares';
import * as passport from 'passport';
import {UserService} from './user.service';
import {userProviders} from './user.providers';
import {DatabaseModule} from '../database/database.module';
import {PASSWORD_CRYPTOGRAPHER_TOKEN} from './constants';
import {LoggerModule} from '../logger/logger.module';
import {EmailValidatorModule} from '../validation/email/email-validator.module';

@Module({
  controllers: [UserController],
  components: [
    ...userProviders,
    {
      provide: PASSWORD_CRYPTOGRAPHER_TOKEN,
      useClass: PasswordCryptographerServiceImpl
    },
    UserService,
    LocalStrategy
  ],
  modules: [
    EmailValidatorModule,
    DatabaseModule,
    LoggerModule
  ]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('local', { session: false }))
      .forRoutes({ path: '/private', method: RequestMethod.ALL });
  }
}
