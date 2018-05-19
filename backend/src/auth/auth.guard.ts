import {CanActivate, ExecutionContext, Guard} from '@nestjs/common';
import {Reflector} from '@nestjs/core';

import {UserRole} from '../user/user.role';
import {User} from '../user/user.entity';

@Guard()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(req, context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>('roles', context.handler);
    const user: User = req.user;

    if (!roles) {
      // route isn't decorated with `@Authorized`
      return true;
    }

    if (!user) {
      // user not logged
      return false;
    }

    if (roles.length === 0) {
      // `@Authorized` is empty (no roles requirement)
      return true;
    }

    if (roles.indexOf(user.role) !== -1) {
      // user is in provided route roles
      return true;
    }

    return false;
  }
}
