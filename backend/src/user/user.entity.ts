import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';

import {UserPassword} from './user-password.entity';
import {UserRole} from './user.role';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 35})
  firstName: string;

  @Column({length: 35})
  lastName: string;

  @Column({
    length: 50,
    unique: true
  })
  email: string;

  @Column(type => UserPassword)
  password: UserPassword;

  @Column({type: 'enum', enum: UserRole, default: UserRole.Regular})
  role: UserRole;
}
