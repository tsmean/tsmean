import {ReflectMetadata} from '@nestjs/common';

import {UserRole} from '../../user/user.role';

export function Authorized(...roles: UserRole[]);
export function Authorized(roles: UserRole[]);
export function Authorized(...roleOrRoles: Array<UserRole | UserRole[]>) {
  const roles = Array.isArray(roleOrRoles[0]) ? (roleOrRoles[0] as UserRole[]) : (roleOrRoles as UserRole[]);
  return ReflectMetadata('roles', roles);
}
