import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

import {UserPassword} from './user-password.entity';
import {UserRole} from './user.role';
import {AnimalList} from '../animal-list/animal-list.entity';
import {ApiModelProperty} from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  id: number;

  @Column({length: 35})
  @ApiModelProperty()
  firstName: string;

  @Column({length: 35})
  @ApiModelProperty()
  lastName: string;

  @Column({
    length: 50,
    unique: true
  })
  @ApiModelProperty()
  email: string;

  @Column(type => UserPassword)
  password: UserPassword;

  @Column({type: 'enum', enum: UserRole, default: UserRole.Regular})
  role: UserRole;

  @OneToMany(type => AnimalList, animalList => animalList.owner)
  animalLists: AnimalList[];
}
