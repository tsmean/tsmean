import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 35 })
  name: string;

  @Column({ length: 255 })
  pic: string;

}
