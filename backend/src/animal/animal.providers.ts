import { Connection, Repository } from 'typeorm';
import {Animal} from './animal.entity';
import {DB_CONNECTION_TOKEN, ANIMAL_REPOSITORY_TOKEN} from './constants';

export const animalProviders = [
  {
    provide: ANIMAL_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(Animal),
    inject: [DB_CONNECTION_TOKEN]
  }
];
