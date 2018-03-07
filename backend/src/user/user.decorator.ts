import {createRouteParamDecorator} from '@nestjs/common';
import {plainToClass} from 'class-transformer';

import {User} from './user.entity';

export const CurrentUser = createRouteParamDecorator((data, req) => {
  return plainToClass(User, req.user);
});
