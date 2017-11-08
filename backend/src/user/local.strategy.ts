import * as passport from 'passport';
import * as local from 'passport-local';
import { Component, Inject } from '@nestjs/common';
import {UserService} from './user.service';
import {PASSWORD_CRYPTOGRAPHER_TOKEN} from './constants';
import {PasswordCryptographerService} from './password-cryptographer/password-cryptographer.interface';

@Component()
export class LocalStrategy {
  constructor(
    @Inject(PASSWORD_CRYPTOGRAPHER_TOKEN) private readonly passwordCryptographer: PasswordCryptographerService,
    private readonly userService: UserService
  ) {
    passport.use('local', new local.Strategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password'
      }, (email, password, done) => {
        this.userService.findOneByEmail(email)
          .then(user => {
            this.passwordCryptographer.doCompare(password, user.password.hash).then(isMatching => {
              if (!isMatching) {
                return done(null, false, { message: 'Wrong password or username.' });
              } else {
                return done(null, user);
              }
            });
          })
          .catch(err => {
            return done(null, false, { message: 'Wrong password or username.' });
          });
      }
    ));
  }

}
