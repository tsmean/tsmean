import {Resource, ResourceWithoutId} from '@tsmean/shared';

export interface User extends Resource, UserFields {
}

export interface UserWithoutId extends ResourceWithoutId, UserFields {
}

interface UserFields {
  email: string;
  firstName: string;
  lastName: string;
}
