import {Entity, OneToMany, Column, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

import {Animal} from '../animal/animal.entity';
import {User} from '../user/user.entity';

@Entity()
export class AnimalList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => User, user => user.animalLists, { nullable: true })
  owner?: User;

  @OneToMany(type => Animal, animal => animal.list, {cascadeInsert: true})
  animals: Animal[];
}
