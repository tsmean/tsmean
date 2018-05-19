import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ApiModelProperty} from '@nestjs/swagger';

import {Animal} from '../animal/animal.entity';
import {User} from '../user/user.entity';

@Entity()
export class AnimalList {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  id: number;

  @Column()
  @ApiModelProperty()
  name: string;

  @ManyToOne(type => User, user => user.animalLists, {eager: true, nullable: true})
  owner?: User;

  @OneToMany(type => Animal, animal => animal.list, {cascadeInsert: true})
  animals: Animal[];
}
