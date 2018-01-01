import {EmailValidator} from '@tsmean/shared';
import {Component} from '@nestjs/common';

@Component()
export class EmailValidatorImpl extends EmailValidator {
  constructor() {
    super();
  }
}
