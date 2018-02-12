import { Module } from '@nestjs/common';
import {EmailValidatorImpl} from './email-validator.component';

@Module({
  components: [EmailValidatorImpl],
  exports: [EmailValidatorImpl],
})
export class EmailValidatorModule {}
