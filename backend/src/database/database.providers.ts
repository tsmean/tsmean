import { createConnection } from 'typeorm';
import {DB_CONNECTION_TOKEN} from '../user/constants';

export const databaseProviders = [
  {
    provide: DB_CONNECTION_TOKEN,
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: 'mysql.cn32tstd6wqk.eu-central-1.rds.amazonaws.com',
      port: 3306,
      username: 'tsmean',
      password: 'jdj2198fjj1jjf9j1jwjd',
      database: 'testdb',
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}'
      ],
      autoSchemaSync: true,
    })
  }
];
