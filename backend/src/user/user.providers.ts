import { Connection, Repository } from 'typeorm';
import {User} from './user.entity';
import {UserPassword} from './user-password.entity';
import {DB_CONNECTION_TOKEN, USER_PASSWORD_REPOSITORY_TOKEN, USER_REPOSITORY_TOKEN} from './constants';

export const userProviders = [
  {
    provide: USER_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [DB_CONNECTION_TOKEN]
  }, {
    provide: USER_PASSWORD_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(UserPassword),
    inject: [DB_CONNECTION_TOKEN]
  }
];
