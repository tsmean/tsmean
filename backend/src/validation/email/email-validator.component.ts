import {EmailValidator} from '../../../../shared/src/validation/email-validator/email-validator.service';
import {Component} from '@nestjs/common';

@Component()
export class EmailValidatorImpl extends EmailValidator {
  constructor() {
    super();
  }
}
