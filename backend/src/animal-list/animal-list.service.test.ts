import {Test} from '@nestjs/testing';

import {AnimalListService} from './animal-list.service';
import {animalListProviders} from './animal-list.providers';
import {databaseProviders} from '../database/database.providers';
import {Log} from '../logger/logger';
import {AnimalList} from './animal-list.entity';
import {configProviders} from '../config/config.providers';
import {User} from '../user/user.entity';
import {UserRole} from '../user/user.role';

describe('AnimalListService', () => {
  let animalListService: AnimalListService;
  const mockAdminUser: User = {id: 1, role: UserRole.Admin} as User;

  /**
   * Can't be beforeEach here, or else you'll get error since JEST runs in parallel:
   * Cannot create a new connection named "default",
   * because connection with such name already exist and it now has an active connection session.
   */
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      components: [Log, ...configProviders, ...databaseProviders, ...animalListProviders, AnimalListService]
    }).compile();

    animalListService = module.get<AnimalListService>(AnimalListService);
  });

  it('should be able to create an animal list', done => {
    createRandomAnimalList().then(resp => {
      if (resp.id !== undefined) {
        done();
      }
    });
  });

  it('should be able to find all animal lists', async () => {
    const resp = await animalListService.find();
    expect(Array.isArray(resp)).toBe(true);
  });

  it('should be able to find one animal list by id', async () => {
    const createdAnimalList = await createRandomAnimalList();
    const foundAnimalList = await animalListService.findOneById(createdAnimalList.id);
    expect(!!foundAnimalList).toBe(true);
    expect(foundAnimalList.id).toBe(createdAnimalList.id);
  });

  it('should be able to update animal list', async () => {
    const createdAnimalList = await createRandomAnimalList();
    await animalListService.update(createdAnimalList.id, {name: 'New list'});
    const updatedAnimalList = await animalListService.findOneById(createdAnimalList.id);
    expect(updatedAnimalList).not.toBeUndefined();
    expect(updatedAnimalList.name).toBe('New list');
  });

  it('should be able to remove animal list', async () => {
    const createdAnimalList = await createRandomAnimalList();
    await animalListService.remove(createdAnimalList.id);
    const deletedAnimalList = await animalListService.findOneById(createdAnimalList.id);
    expect(deletedAnimalList).toBeUndefined();
  });

  let counter = 0;
  function createRandomAnimalList(): Promise<AnimalList> {
    const animalList = {
      id: ++counter,
      name: 'Random list'
    };
    return animalListService.create(animalList, mockAdminUser);
  }
});
