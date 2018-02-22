import {Module} from '@nestjs/common';

import {UserModule} from './user/user.module';
import {WelcomeModule} from './welcome/welcome.module';
import {AnimalModule} from './animal/animal.module';
import {ConfigModule} from './config/config.module';
import {AuthModule} from './auth/auth.module';

@Module({
  modules: [UserModule, AuthModule, AnimalModule, WelcomeModule, ConfigModule]
})
export class AppModule {}
