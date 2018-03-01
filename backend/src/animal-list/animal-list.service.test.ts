import {Test} from '@nestjs/testing';
import {Repository} from 'typeorm';

import {AnimalListService} from './animal-list.service';
import {animalListProviders} from './animal-list.providers';
import {databaseProviders} from '../database/database.providers';
import {Log} from '../logger/logger';
import {AnimalList} from './animal-list.entity';
import {configProviders} from '../config/config.providers';
import {User} from '../user/user.entity';
import {UserRole} from '../user/user.role';
import {ANIMAL_LIST_REPOSITORY_TOKEN} from './constants';
import {Animal} from '../animal/animal.entity';

describe('AnimalListService', () => {
  let animalListService: AnimalListService;
  const mockAdminUser: User = {id: 1, role: UserRole.Admin} as User;
  let animalListRepository: Repository<AnimalList>;

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
    animalListRepository = module.get<Repository<AnimalList>>(ANIMAL_LIST_REPOSITORY_TOKEN);
  });

  it('should be able to create an animal list', async () => {
    const exampleList = createExampleList(1);
    jest.spyOn(animalListRepository, 'save').mockImplementation(entity => entity);

    const addedList = await animalListService.create(exampleList, mockAdminUser);

    expect(addedList.name).toEqual(exampleList.name);
  });

  it('should be able to find one animal list by id', async () => {
    const createdList = await createExampleList(1);
    jest.spyOn(animalListRepository, 'findOneById').mockImplementation(id => createExampleList(id));

    const foundList = await animalListService.findOneById(createdList.id);
    expect(!!foundList).toBe(true);
    expect(foundList.id).toBe(createdList.id);
  });

  it('should be able to update animal list', async () => {
    const createdList = await createExampleList(1);
    jest.spyOn(animalListRepository, 'findOneById').mockImplementation(id => createExampleList(id));

    const updatedAnimal = await animalListService.update(createdList.id, {name: 'New name'});
    expect(updatedAnimal).toBeDefined();
    expect(updatedAnimal.name).toBe('New name');
  });

  it('should be able to remove animal list', async () => {
    let hasRemoved: number;
    const createdList = await createExampleList(1);
    jest.spyOn(animalListRepository, 'findOneById').mockImplementation(id => createExampleList(id));
    jest.spyOn(animalListRepository, 'deleteById').mockImplementation(id => (hasRemoved = id));

    await animalListService.remove(createdList.id);
    expect(hasRemoved).toEqual(createdList.id);
  });

  function createExampleList(id: number, animals?: Animal[]): AnimalList {
    return {
      id,
      name: 'Mouse',
      animals
    } as AnimalList;
  }
});
