import {PasswordValidator} from '@tsmean/shared/src/validation/password-validator/password-validator.service';
import {Component} from '@nestjs/common';

@Component()
export class PasswordValidatorImpl extends PasswordValidator {
  constructor() {
    super();
  }
}

