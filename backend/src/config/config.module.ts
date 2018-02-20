import {Module} from '@nestjs/common';

import {configProviders} from './config.providers';

@Module({
  components: [...configProviders],
  exports: [...configProviders]
})
export class ConfigModule {}
