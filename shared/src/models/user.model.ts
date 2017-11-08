import {Resource} from '../../../frontend/resource/src/app/resource/resource';

export interface IUser extends Resource {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
}
