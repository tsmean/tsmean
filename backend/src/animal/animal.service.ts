import { Component, Inject } from '@nestjs/common';
import {FindManyOptions, Repository} from 'typeorm';
import {Animal} from './animal.entity';
import {ANIMAL_REPOSITORY_TOKEN} from './constants';
import {DeepPartial} from 'typeorm/common/DeepPartial';
import {Log} from '../logger/logger';

@Component()
export class AnimalService {
  constructor(
    @Inject(ANIMAL_REPOSITORY_TOKEN) private readonly animalRepository: Repository<Animal>,
    private log: Log
  ) {}

  // Create
  async create(animalDto: Animal): Promise<Animal> {

    this.log.debug('trying to create animal...');

    const animal = new Animal();
    Object.assign(animal, animalDto);
    const savedAnimal = await this.animalRepository.save(animal);
    this.log.debug('saved animal:', savedAnimal);
    return savedAnimal;
  }

  // Read
  async find(options?: FindManyOptions<Animal>): Promise<Animal[]> {
    const defaultOptions = {
      take: 100,
      skip: 0
    };
    const resultingOptions = options || defaultOptions;
    this.log.debug(`searching for max ${resultingOptions.take} animals with an offset of ${resultingOptions.skip} ...`);
    return await this.animalRepository.find(resultingOptions);
  }

  async findOneById(id: number): Promise<Animal> {
    this.log.debug('trying to find one animal by id...');
    return await this.animalRepository.findOneById(id);
  }

  // Update
  async update(id: number, partialEntry: DeepPartial<Animal>): Promise<void> {
    this.log.debug('trying to update animal...');
    return await this.animalRepository.updateById(id, partialEntry);
  }

  // Delete
  async remove(id: number): Promise<void> {
    this.log.debug('trying to remove animal...');
    return await this.animalRepository.removeById(id);
  }

}
