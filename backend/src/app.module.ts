import { Module } from '@nestjs/common';
import {UserModule} from './user/user.module';
import {WelcomeModule} from './welcome/welcome.module';
import {AnimalModule} from './animal/animal.module';

@Module({
  modules: [
    UserModule,
    AnimalModule,
    WelcomeModule
  ]
})
export class AppModule {}
