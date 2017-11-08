import { Test } from '@nestjs/testing';
import { AnimalController } from './animal.controller';
import {AnimalService} from './animal.service';
import {Animal} from './animal.entity';
import {databaseProviders} from '../database/database.providers';
import {animalProviders} from './animal.providers';
import {Log} from '../logger/logger';

describe('AnimalController', () => {
  let animalController: AnimalController;
  let animalService: AnimalService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AnimalController],
      components: [
        Log,
        ...databaseProviders,
        ...animalProviders,
        AnimalService
      ],
    }).compile();

    animalService = module.get<AnimalService>(AnimalService);
    animalController = module.get<AnimalController>(AnimalController);
  });

  it('should be able to find animals', async () => {
    const animals: Animal[] = [exampleAnimal(1), exampleAnimal(2)];
    jest.spyOn(animalService, 'find').mockImplementation(() => animals);
    expect(await animalController.find()).toBe(animals);
  });

  it('should be able to find one animal by id', async (done) => {
    const animal = exampleAnimal(1);
    jest.spyOn(animalService, 'findOneById').mockImplementation(() => animal);
    expect(await animalController.findOne(1)).toBe(animal);
    done();
  });

  it('should be able to update one animal', async (done) => {
    const animal = exampleAnimal(1);
    jest.spyOn(animalService, 'update').mockImplementation(() => undefined);
    const returnVal = await animalController.fullUpdate(animal);
    expect(returnVal).toBeUndefined();
    done();
  });

  it('should be able to partial update one animal', async (done) => {
    const animal = exampleAnimal(1);
    jest.spyOn(animalService, 'update').mockImplementation(() => undefined);
    const returnVal = await animalController.partialUpdate(animal.id, animal);
    expect(returnVal).toBeUndefined();
    done();
  });

  it('should be able to remove one animal', async (done) => {
    const animal = exampleAnimal(1);
    jest.spyOn(animalService, 'remove').mockImplementation(() => undefined);
    const returnVal = await animalController.remove(animal.id);
    expect(returnVal).toBeUndefined();
    done();
  });

  function exampleAnimal(id: number): Animal {
    return {
      id: id,
      name: 'Mouse',
      pic: 'some/path'
    };
  }

});
