import {Column} from 'typeorm';

export class UserPassword {
  @Column()
  hash: string;

  @Column()
  algorithm: string;
}
