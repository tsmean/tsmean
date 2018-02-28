import {Module} from '@nestjs/common';

import {AnimalListController} from './animal-list.controller';
import {AnimalListService} from './animal-list.service';
import {animalListProviders} from './animal-list.providers';
import {DatabaseModule} from '../database/database.module';
import {LoggerModule} from '../logger/logger.module';

@Module({
  controllers: [AnimalListController],
  components: [...animalListProviders, AnimalListService],
  modules: [DatabaseModule, LoggerModule],
  exports: [AnimalListService]
})
export class AnimalListModule {}
