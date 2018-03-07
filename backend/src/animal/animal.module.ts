import {Module} from '@nestjs/common';

import {AnimalController} from './animal.controller';
import {AnimalService} from './animal.service';
import {animalProviders} from './animal.providers';
import {DatabaseModule} from '../database/database.module';
import {LoggerModule} from '../logger/logger.module';
import {AnimalListModule} from '../animal-list/animal-list.module';

@Module({
  controllers: [AnimalController],
  components: [...animalProviders, AnimalService],
  modules: [DatabaseModule, LoggerModule, AnimalListModule]
})
export class AnimalModule {}
