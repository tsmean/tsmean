import {Connection} from 'typeorm';

import {User} from './user.entity';
import {USER_REPOSITORY_TOKEN} from './constants';
import {DB_CONNECTION_TOKEN} from '../database/constants';

export const userProviders = [
  {
    provide: USER_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [DB_CONNECTION_TOKEN]
  }
];
