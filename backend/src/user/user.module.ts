import {Module} from '@nestjs/common';

import {UserController} from './user.controller';
import {UserService} from './user.service';
import {userProviders} from './user.providers';
import {PasswordCryptographerServiceImpl} from '../auth/password-cryptographer/password-cryptographer';
import {PASSWORD_CRYPTOGRAPHER_TOKEN} from '../auth/constants';
import {DatabaseModule} from '../database/database.module';
import {LoggerModule} from '../logger/logger.module';
import {EmailValidatorModule} from '../validation/email/email-validator.module';
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
export class UserModule {}
