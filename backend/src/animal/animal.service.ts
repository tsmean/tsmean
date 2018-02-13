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
    const animal = new Animal();
    Object.assign(animal, animalDto);
    const savedAnimal = await this.animalRepository.save(animal);
    return savedAnimal;
  }

  // Read
  async find(findOptions?: FindManyOptions<Animal>): Promise<Animal[]> {
    const options = {
      take: 100,
      skip: 0,
      ...findOptions, // overwrite default ones
    }
    return await this.animalRepository.find(options);
  }

  async findOneById(id: number): Promise<Animal> {
    return await this.animalRepository.findOneById(id);
  }

  // Update
  async update(id: number, partialEntry: DeepPartial<Animal>): Promise<Animal> {
    await this.animalRepository.updateById(id, partialEntry);
    return this.findOneById(id);
  }

  // Delete
  async remove(id: number): Promise<void> {
    return await this.animalRepository.removeById(id);
  }

}
