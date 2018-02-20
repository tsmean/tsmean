import {createConnection} from 'typeorm';

import {CONFIG_TOKEN} from './constants';
import {AppProperties} from './app-properties.model';

export const configProviders = [
  {
    provide: CONFIG_TOKEN,
    useFactory: async (): Promise<AppProperties> => {
      const nodeEnv = process.env.NODE_ENV || 'development';
      const config: AppProperties = require(`../../properties/${nodeEnv}.properties.json`);
      return config;
    }
  }
];
