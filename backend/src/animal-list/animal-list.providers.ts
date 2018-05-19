import {Connection} from 'typeorm';

import {AnimalList} from './animal-list.entity';
import {ANIMAL_LIST_REPOSITORY_TOKEN} from './constants';
import {DB_CONNECTION_TOKEN} from '../database/constants';

export const animalListProviders = [
  {
    provide: ANIMAL_LIST_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => {
      return connection.getRepository(AnimalList);
    },
    inject: [DB_CONNECTION_TOKEN]
  }
];
