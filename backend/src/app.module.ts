import {Module} from '@nestjs/common';

import {UserModule} from './user/user.module';
import {WelcomeModule} from './welcome/welcome.module';
import {AnimalModule} from './animal/animal.module';
import {ConfigModule} from './config/config.module';

@Module({
  modules: [UserModule, AnimalModule, WelcomeModule, ConfigModule]
})
export class AppModule {}
