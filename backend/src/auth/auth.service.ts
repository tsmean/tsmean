import {sign, SignOptions} from 'jsonwebtoken';
import {Component, Inject} from '@nestjs/common';

import {AppProperties} from '../config/app-properties.model';
import {CONFIG_TOKEN} from '../config/constants';
import {User} from '../user/user.entity';

@Component()
export class AuthService {
  private static readonly DEFAULT_SIGN_OPTIONS: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '7d'
  };

  private readonly signOptions: SignOptions;
  private readonly secret: string;

  constructor(@Inject(CONFIG_TOKEN) config: AppProperties) {
    this.secret = config.token.secret;
    this.signOptions = {
      algorithm: config.token.algorithm || AuthService.DEFAULT_SIGN_OPTIONS.algorithm,
      expiresIn: config.token.expiresIn || AuthService.DEFAULT_SIGN_OPTIONS.expiresIn,
    };
  }

  createToken(payload: object): string {
    return sign(payload, this.secret, this.signOptions);
  }

  async validateUser(signedUser: User): Promise<boolean> {
    // put some validation logic here
    // for example token blacklist or query db by id/email
    return true;
  }
}
