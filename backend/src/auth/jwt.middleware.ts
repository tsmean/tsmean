import {ExpressMiddleware, Middleware, NestMiddleware} from '@nestjs/common';
import * as passport from 'passport';

interface Route {
  excludedPath: string;
  method: string;
}

@Middleware()
export class JWTMiddleware implements NestMiddleware {
  async resolve(): Promise<ExpressMiddleware> {
    return async (req, res, next) => {
      passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (user) {
          req.user = user;
        }
        return next();
      })(req, res, next);
    };
  }
}
