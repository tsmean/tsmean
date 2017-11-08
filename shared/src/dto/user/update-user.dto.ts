import { IsString, IsInt } from 'class-validator';
import {IUser} from '../../models/user.model';

export class UpdateUserDto {

  // TODO: how can i validate this?
  readonly user: IUser;

}
