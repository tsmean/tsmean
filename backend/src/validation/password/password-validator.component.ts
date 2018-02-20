import {PasswordValidator} from '@tsmean/shared';
import {Component} from '@nestjs/common';

@Component()
export class PasswordValidatorImpl extends PasswordValidator {
  constructor() {
    super();
  }
}
