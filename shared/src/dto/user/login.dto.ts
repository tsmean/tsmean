// import {IsString, IsEmail} from 'class-validator';
// import {ApiModelProperty} from '@nestjs/swagger';

export class LoginDto {
  // @IsEmail()
  // @ApiModelProperty()
  email: string;

  // @IsString()
  // @ApiModelProperty()
  password: string;
}
