import * as passport from 'passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {Component, Inject} from '@nestjs/common';

import {AuthService} from '../auth.service';
import {AppProperties} from '../../config/app-properties.model';
import {CONFIG_TOKEN} from '../../config/constants';

@Component()
export class JwtStrategy extends Strategy {
  constructor(private readonly authService: AuthService, @Inject(CONFIG_TOKEN) config: AppProperties) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: config.token.secret,
      },
      async (req, payload, next) => await this.verify(req, payload, next)
    );
    passport.use(this);
  }

  async verify(req, payload, done) {
    const isValid = await this.authService.validateUser(payload);
    if (!isValid) {
      return done('Unauthorized', false);
    }
    done(null, payload);
  }
}
