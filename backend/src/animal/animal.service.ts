import {Component, Inject} from '@nestjs/common';
import {FindManyOptions, ObjectLiteral, Repository} from 'typeorm';
import {DeepPartial} from 'typeorm/common/DeepPartial';

import {Animal} from './animal.entity';
import {ANIMAL_REPOSITORY_TOKEN} from './constants';
import {Log} from '../logger/logger';

@Component()
export class AnimalService {
  constructor(@Inject(ANIMAL_REPOSITORY_TOKEN) private readonly animalRepository: Repository<Animal>, private log: Log) {}

  // Create
  async create(animalEntry: DeepPartial<Animal>): Promise<Animal> {
    const animal = new Animal();
    Object.assign(animal, animalEntry);
    const savedAnimal = await this.animalRepository.save(animal);
    return savedAnimal;
  }

  // Read
  async find(listId: number, findOptions?: FindManyOptions<Animal>): Promise<Animal[]> {
    const options: FindManyOptions<Animal> = {
      take: 100,
      skip: 0,
      where: {},
      ...findOptions // overwrite default ones
    };
    (options.where as ObjectLiteral).listId = listId;
    return await this.animalRepository.find(options);
  }

  async findOneById(id: number, listId: number): Promise<Animal> {
    const foundAnimal = await this.animalRepository.findOneById(id);
    if (foundAnimal.list.id !== listId) {
      throw new Error(`Animal with id ${id} doesn't belong to list with id ${listId}!`);
    }
    return foundAnimal;
  }

  // Update
  async update(id: number, partialEntry: DeepPartial<Animal>, listId: number): Promise<Animal> {
    const foundAnimal = await this.findOneById(id, listId);
    this.animalRepository.merge(foundAnimal, partialEntry);
    return await this.animalRepository.save(foundAnimal);
  }

  // Delete
  async remove(id: number): Promise<void> {
    return await this.animalRepository.removeById(id);
  }
}
