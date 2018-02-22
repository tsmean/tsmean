import {Middleware, NestMiddleware, ExpressMiddleware, RequestMethod} from '@nestjs/common';
import * as passport from 'passport';

interface Route {
  excludedPath: string;
  method: string;
}

@Middleware()
export class AuthMiddleware implements NestMiddleware {
  async resolve(...excludedRoutes: Route[]): Promise<ExpressMiddleware> {
    return async (req, res, next) => {
      if (
        excludedRoutes.filter(
          excludedRoute =>
            excludedRoute.excludedPath == req.path &&
            (excludedRoute.method === RequestMethod[req.method] || req.method === RequestMethod.ALL)
        ).length
      ) {
        next();
      } else {
        passport.authenticate('jwt', {session: false})(req, res, next);
      }
    };
  }
}
