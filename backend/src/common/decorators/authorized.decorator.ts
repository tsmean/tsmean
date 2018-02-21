import {ReflectMetadata} from '@nestjs/common';

import {UserRole} from '../../user/user.role';

export function Authorized(...roles: UserRole[]);
export function Authorized(roles: UserRole[]);
export function Authorized(roleOrRoles: UserRole | UserRole[]) {
    const roles = Array.isArray(roleOrRoles) ? roleOrRoles : [roleOrRoles];
    return ReflectMetadata('roles', roles);
}
