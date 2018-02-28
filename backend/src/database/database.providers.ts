import {createConnection} from 'typeorm';
import {ComponentMetatype} from '@nestjs/core/injector/module';

import {CONFIG_TOKEN} from '../config/constants';
import {AppProperties} from '../config/app-properties.model';
import {DB_CONNECTION_TOKEN} from './constants';

type Provider = Partial<ComponentMetatype>;
const nodeEnv = process.env.NODE_ENV;

export const databaseProviders: Array<Provider> = [
  {
    provide: DB_CONNECTION_TOKEN,
    inject: [CONFIG_TOKEN],
    useFactory: async ({db}: AppProperties) =>
      await createConnection({
        type: 'mysql',
        host: db.host,
        port: db.port,
        username: db.dbuser,
        password: db.dbpassword,
        database: db.dbname,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        logger: 'advanced-console',
        logging: nodeEnv !== 'test' ? 'all' : false
      })
  }
];
