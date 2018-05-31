// import {IsString, IsInt} from 'class-validator';
// import { ApiModelProperty } from '@nestjs/swagger';

import {IUser} from '../../models/user.model';

export class CreateUserDto {
  // TODO: how can i validate this?
  // @ApiModelProperty()
  readonly user: IUser;

  // @IsString()
  // @ApiModelProperty()
  readonly password: string;
}
