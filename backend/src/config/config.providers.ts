import * as path from 'path';

import {CONFIG_TOKEN} from './constants';
import {AppProperties} from './app-properties.model';

export const configProviders = [
  {
    provide: CONFIG_TOKEN,
    useFactory: async (): Promise<AppProperties> => {
      const nodeEnv = process.env.NODE_ENV || 'development';
      const propertiesFolder = path.resolve(process.cwd(), 'properties');
      const config: AppProperties = require(`${propertiesFolder}/${nodeEnv}.properties.json`);
      return config;
    }
  }
];
