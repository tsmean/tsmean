import {Resource, ResourceWithoutId} from '@tsmean/shared';

interface UserFields {
  email: string;
  firstName: string;
  lastName: string;
}

export interface User extends Resource, UserFields {}
export interface UserWithoutId extends ResourceWithoutId, UserFields {}
