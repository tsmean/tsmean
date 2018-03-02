import {Test} from '@nestjs/testing';

import {AnimalListController} from './animal-list.controller';
import {AnimalListService} from './animal-list.service';
import {AnimalList} from './animal-list.entity';
import {databaseProviders} from '../database/database.providers';
import {animalListProviders} from './animal-list.providers';
import {Log} from '../logger/logger';
import {Animal} from '../animal/animal.entity';
import {UserRole} from '../user/user.role';
import {User} from '../user/user.entity';
import {configProviders} from '../config/config.providers';

describe('AnimalListController', () => {
  let animalListController: AnimalListController;
  let animalListService: AnimalListService;
  const mockAdminUser: User = {id: 1, role: UserRole.Admin} as User;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AnimalListController],
      components: [Log, ...configProviders, ...databaseProviders, ...animalListProviders, AnimalListService]
    }).compile();

    animalListService = module.get<AnimalListService>(AnimalListService);
    animalListController = module.get<AnimalListController>(AnimalListController);
  });

  it('should be able to find animals lists', async () => {
    const animalLists: AnimalList[] = [exampleAnimalList(1), exampleAnimalList(2)];
    jest.spyOn(animalListService, 'find').mockImplementation(() => animalLists);
    expect(await animalListController.find({}, mockAdminUser)).toBe(animalLists);
  });

  it('should be able to find one animal by id', async () => {
    const animalList = exampleAnimalList(1);
    jest.spyOn(animalListService, 'findOneById').mockImplementation(() => animalList);
    const foundList = await animalListController.findOne(1);
    expect(foundList).toBe(animalList);
  });

  it('should be able to full update one animal list', async () => {
    const animalList = exampleAnimalList(2);
    jest.spyOn(animalListService, 'findOneById').mockImplementation(() => animalList);
    jest.spyOn(animalListService, 'update').mockImplementation(() => undefined);
    const returnVal = await animalListController.fullUpdate(animalList, mockAdminUser);
    expect(returnVal).toBeUndefined();
  });

  it('should be able to partial update one animal list', async () => {
    const animalList = exampleAnimalList(2);
    const animalListChanges = {name: 'New name'};
    jest.spyOn(animalListService, 'findOneById').mockImplementation(() => animalList);
    jest.spyOn(animalListService, 'update').mockImplementation(() => undefined);
    const returnVal = await animalListController.partialUpdate(2, animalListChanges, mockAdminUser);
    expect(returnVal).toBeUndefined();
  });

  it('should be able to remove one animal list', async () => {
    const animalList = exampleAnimalList(2);
    jest.spyOn(animalListService, 'findOneById').mockImplementation(() => animalList);
    jest.spyOn(animalListService, 'remove').mockImplementation(() => undefined);
    const returnVal = await animalListController.remove(animalList.id, mockAdminUser);
    expect(returnVal).toBeUndefined();
  });

  it('should not be able to remove public animal list', async () => {
    expect.assertions(2);
    const animalList = exampleAnimalList(1);
    jest.spyOn(animalListService, 'findOneById').mockImplementation(() => animalList);
    jest.spyOn(animalListService, 'remove').mockImplementation(() => undefined);
    try {
      await animalListController.remove(animalList.id, mockAdminUser);
    } catch (err) {
      expect(err.message.message).toEqual('Access denied!');
      expect(err.message.statusCode).toEqual(403);
    }
  });

  function exampleAnimalList(id: number): AnimalList {
    const animalList = new AnimalList();
    animalList.id = id;
    animalList.name = 'MyList';
    animalList.animals = [exampleAnimal(1, animalList), exampleAnimal(2, animalList)];
    if (id !== 1) {
      animalList.owner = mockAdminUser;
    }
    return animalList;
  }

  function exampleAnimal(id: number, list: AnimalList): Animal {
    return {
      id,
      name: 'Random animal'
    } as Animal;
  }
});
