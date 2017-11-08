import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import {UserPassword} from './user-password.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 35 })
  firstName: string;

  @Column({ length: 35 })
  lastName: string;


  @Column({
    length: 50,
    unique: true
  })
  email: string;

  @OneToOne(type => UserPassword)
  @JoinColumn()
  password: UserPassword;

}
