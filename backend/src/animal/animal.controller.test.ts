import {Test} from '@nestjs/testing';

import {AnimalController} from './animal.controller';
import {AnimalService} from './animal.service';
import {Animal} from './animal.entity';
import {databaseProviders} from '../database/database.providers';
import {animalProviders} from './animal.providers';
import {Log} from '../logger/logger';
import {configProviders} from '../config/config.providers';
import {AnimalListService} from '../animal-list/animal-list.service';
import {animalListProviders} from '../animal-list/animal-list.providers';
import {AnimalList} from '../animal-list/animal-list.entity';
import {User} from '../user/user.entity';
import {UserRole} from '../user/user.role';

describe('AnimalController', () => {
  let animalController: AnimalController;
  let animalService: AnimalService;
  let animalListService: AnimalListService;
  const mockAdminUser: User = {id: 1, role: UserRole.Admin} as User;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AnimalController],
      components: [
        Log,
        ...configProviders,
        ...databaseProviders,
        ...animalProviders,
        ...animalListProviders,
        AnimalService,
        AnimalListService
      ]
    }).compile();

    animalService = module.get(AnimalService);
    animalListService = module.get(AnimalListService);
    animalController = module.get(AnimalController);
  });

  it('should be able to find animals from public list', async () => {
    const animals: Animal[] = [exampleAnimal(1), exampleAnimal(2)];
    const animalsList = exampleAnimalList(1);
    jest.spyOn(animalListService, 'findOneById').mockImplementation(() => animalsList);
    jest.spyOn(animalService, 'find').mockImplementation(() => animals);
    expect(await animalController.find(animalsList.id)).toBe(animals);
  });

  it('should be able to find animals from users list', async () => {
    const animals: Animal[] = [exampleAnimal(1), exampleAnimal(2)];
    const animalsList = exampleAnimalList(2);
    jest.spyOn(animalListService, 'findOneById').mockImplementation(() => animalsList);
    jest.spyOn(animalService, 'find').mockImplementation(() => animals);
    expect(await animalController.find(animalsList.id, mockAdminUser)).toBe(animals);
  });

  it('should be able to find one animal by id', async () => {
    const animal = exampleAnimal(1);
    const animalsList = exampleAnimalList(1);
    jest.spyOn(animalListService, 'findOneById').mockImplementation(() => animalsList);
    jest.spyOn(animalService, 'findOneById').mockImplementation(() => animal);
    expect(await animalController.findOne(animalsList.id, animal.id)).toBe(animal);
  });

  it('shouldnt be able to find one animal by id from private list', async () => {
    expect.assertions(2);
    const animal = exampleAnimal(1);
    const animalsList = exampleAnimalList(2);
    jest.spyOn(animalListService, 'findOneById').mockImplementation(() => animalsList);
    jest.spyOn(animalService, 'findOneById').mockImplementation(() => animal);
    try {
      await animalController.findOne(animalsList.id, animal.id);
    } catch (err) {
      expect(err.message.message).toEqual('Access denied!');
      expect(err.message.statusCode).toEqual(403);
    }
  });

  it('should be able to update one animal', async () => {
    const animal = exampleAnimal(1);
    const animalsList = exampleAnimalList(2);
    jest.spyOn(animalListService, 'findOneById').mockImplementation(() => animalsList);
    jest.spyOn(animalService, 'update').mockImplementation(() => undefined);
    const returnVal = await animalController.fullUpdate(animalsList.id, animal, mockAdminUser);
    expect(returnVal).toBeUndefined();
  });

  it('should be able to partial update one animal', async () => {
    const animal = exampleAnimal(1);
    const animalsList = exampleAnimalList(1);
    jest.spyOn(animalListService, 'findOneById').mockImplementation(() => animalsList);
    jest.spyOn(animalService, 'update').mockImplementation(() => undefined);
    const returnVal = await animalController.partialUpdate(animal.id, animal, animalsList.id);
    expect(returnVal).toBeUndefined();
  });

  it('should be able to remove one animal', async () => {
    const animal = exampleAnimal(1);
    const animalsList = exampleAnimalList(1);
    jest.spyOn(animalListService, 'findOneById').mockImplementation(() => animalsList);
    jest.spyOn(animalService, 'remove').mockImplementation(() => undefined);
    const returnVal = await animalController.remove(animal.id, animalsList.id);
    expect(returnVal).toBeUndefined();
  });

  function exampleAnimalList(id: number, animals?: Animal[]): AnimalList {
    const animalList = new AnimalList();
    animalList.id = id;
    animalList.name = 'MyList';
    animalList.animals = animals || [exampleAnimal(1, animalList), exampleAnimal(2, animalList)];
    if (id !== 1) {
      animalList.owner = mockAdminUser;
    }
    return animalList;
  }

  function exampleAnimal(id: number, list?: AnimalList): Animal {
    return {
      id,
      name: 'Random animal',
      list
    } as Animal;
  }
});
