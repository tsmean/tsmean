import {createConnection} from 'typeorm';

import {CONFIG_TOKEN} from './constants';
import {appConfig} from './app-config';
import {AppProperties} from './app-properties.model';

export const configProviders = [
  {
    provide: CONFIG_TOKEN,
    useFactory: async (): Promise<AppProperties> => {
      // TODO: load config by env
      return appConfig.appConfig;
    }
  }
];
