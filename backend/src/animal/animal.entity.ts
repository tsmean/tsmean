import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

import {AnimalList} from '../animal-list/animal-list.entity';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({length: 35})
  name: string;

  @Column({length: 255, nullable: true})
  pic?: string;

  @ManyToOne(type => AnimalList, { eager: true, onDelete: 'CASCADE'})
  list: AnimalList;
}
