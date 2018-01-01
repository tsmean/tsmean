import {IUser} from '@tsmean/shared';

export interface UserWithPassword extends IUser {
  password: UserPassword;
}

export interface UserPassword {
  hash: string;
  algorithm: HashingAlgorithm;
}

export type HashingAlgorithm = 'bcrypt';
