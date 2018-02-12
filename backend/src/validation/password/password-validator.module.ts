import { Module } from '@nestjs/common';
import {PasswordValidatorImpl} from './password-validator.component';

@Module({
  components: [PasswordValidatorImpl],
  exports: [PasswordValidatorImpl],
})
export class PasswordValidatorModule {}
