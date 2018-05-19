import {Connection} from 'typeorm';

import {Animal} from './animal.entity';
import {ANIMAL_REPOSITORY_TOKEN} from './constants';
import {DB_CONNECTION_TOKEN} from '../database/constants';

export const animalProviders = [
  {
    provide: ANIMAL_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(Animal),
    inject: [DB_CONNECTION_TOKEN]
  }
];
