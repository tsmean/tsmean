import {Module, NestModule, RequestMethod} from '@nestjs/common';
import { AnimalController } from './animal.controller';
import {MiddlewaresConsumer} from '@nestjs/common/interfaces/middlewares';
import * as passport from 'passport';
import {AnimalService} from './animal.service';
import {animalProviders} from './animal.providers';
import {DatabaseModule} from '../database/database.module';
import {LoggerModule} from '../logger/logger.module';
import {EmailValidatorModule} from '../validation/email/email-validator.module';

@Module({
  controllers: [AnimalController],
  components: [
    ...animalProviders,
    AnimalService
  ],
  modules: [
    DatabaseModule,
    LoggerModule
  ]
})
export class AnimalModule implements NestModule {
  configure(consumer: MiddlewaresConsumer) {
    // TODO: what's that?
    consumer
      .apply(passport.authenticate('local', { session: false }))
      .forRoutes({ path: '/private', method: RequestMethod.ALL });
  }
}
