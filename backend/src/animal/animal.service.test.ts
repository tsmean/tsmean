import {Test} from '@nestjs/testing';
import {Repository} from 'typeorm';

import {AnimalService} from './animal.service';
import {animalProviders} from './animal.providers';
import {databaseProviders} from '../database/database.providers';
import {Log} from '../logger/logger';
import {Animal} from './animal.entity';
import {configProviders} from '../config/config.providers';
import {ANIMAL_REPOSITORY_TOKEN} from './constants';

describe('animal service', () => {
  let animalService: AnimalService;
  let animalRepository: Repository<Animal>;

  /**
   * Can't be beforeEach here, or else you'll get error since JEST runs in parallel:
   * Cannot create a new connection named "default",
   * because connection with such name already exist and it now has an active connection session.
   */
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      components: [Log, ...configProviders, ...databaseProviders, ...animalProviders, AnimalService]
    }).compile();

    animalService = module.get<AnimalService>(AnimalService);
    animalRepository = module.get<Repository<Animal>>(ANIMAL_REPOSITORY_TOKEN);
  });

  it('should be able to create a animal', async () => {
    const exampleAnimal = createExampleAnimal(1, 1);
    jest.spyOn(animalRepository, 'save').mockImplementation(entity => entity);

    const addedAnimal = await animalService.create(exampleAnimal);

    expect(addedAnimal).toEqual(exampleAnimal);
  });

  it('should be able to find all animals', async () => {
    const listId = 1;
    const exampleAnimals = [createExampleAnimal(1, listId), createExampleAnimal(2, listId), createExampleAnimal(3, listId)];
    jest.spyOn(animalRepository, 'find').mockImplementation(() => exampleAnimals);

    const foundAnimals = await animalService.find(listId);

    expect(foundAnimals).toEqual(exampleAnimals);
  });

  it('should be able to find one animal by id', async () => {
    const listId = 1;
    const createdAnimal = await createExampleAnimal(1, listId);
    jest.spyOn(animalRepository, 'findOneById').mockImplementation(id => createExampleAnimal(id, listId));

    const foundAnimal = await animalService.findOneById(createdAnimal.id, listId);
    expect(!!foundAnimal).toBe(true);
    expect(foundAnimal.id).toBe(createdAnimal.id);
  });

  it('should be able to update animal', async () => {
    const listId = 1;
    const createdAnimal = await createExampleAnimal(1, listId);
    jest.spyOn(animalRepository, 'findOneById').mockImplementation(id => createExampleAnimal(id, listId));

    const updatedAnimal = await animalService.update(createdAnimal.id, {name: 'Elephant'}, listId);
    expect(updatedAnimal).toBeDefined();
    expect(updatedAnimal.name).toBe('Elephant');
  });

  it('should be able to remove animal', async () => {
    const listId = 1;
    let hasRemoved: number;
    const createdAnimal = await createExampleAnimal(1, listId);
    jest.spyOn(animalRepository, 'findOneById').mockImplementation(id => createExampleAnimal(id, listId));
    jest.spyOn(animalRepository, 'removeById').mockImplementation(id => (hasRemoved = id));

    await animalService.remove(createdAnimal.id);
    expect(hasRemoved).toEqual(createdAnimal.id);
  });

  function createExampleAnimal(id: number, listId?: number): Animal {
    return {
      id,
      name: 'Mouse',
      pic: 'none',
      list: {
        id: listId || 1
      }
    } as Animal;
  }
});
