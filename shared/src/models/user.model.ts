import {ResourceWithoutId} from './resource.model';

export interface IUser extends ResourceWithoutId {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
}
