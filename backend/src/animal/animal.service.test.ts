import {Test} from '@nestjs/testing';
import {AnimalService} from './animal.service';
import {animalProviders} from './animal.providers';
import {databaseProviders} from '../database/database.providers';
import {Log} from '../logger/logger';
import {Animal} from './animal.entity';

describe('animal service', () => {

  let animalService: AnimalService;

  /**
   * Can't be beforeEach here, or else you'll get error since JEST runs in parallel:
   * Cannot create a new connection named "default",
   * because connection with such name already exist and it now has an active connection session.
   */
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      components: [
        Log,
        ...databaseProviders,
        ...animalProviders,
        AnimalService],
    }).compile();

    animalService = module.get<AnimalService>(AnimalService);
  });

  it('should be able to create a animal', (done) => {
    createRandomAnimal().then(resp => {
      if (resp.id !== undefined) {
        done();
      }
    });
  });

  it('should be able to find all animals', (done) => {
    animalService.find().then(resp => {
      expect(Array.isArray(resp)).toBe(true);
      done();
    });
  });

  it('should be able to find one animal by id', async (done) => {
    const createdAnimal = await createRandomAnimal();
    const foundAnimal = await animalService.findOneById(createdAnimal.id);
    expect(!!foundAnimal).toBe(true);
    expect(foundAnimal.id).toBe(createdAnimal.id);
    done();
  });

  it('should be able to update animal', async (done) => {
    const createdAnimal = await createRandomAnimal();
    await animalService.update(createdAnimal.id, {name: 'Elephant'});
    const updatedAnimal = await animalService.findOneById(createdAnimal.id);
    expect(updatedAnimal).not.toBeUndefined();
    expect(updatedAnimal.name).toBe('Elephant');
    done();
  });

  it('should be able to remove animal', async (done) => {
    const createdAnimal = await createRandomAnimal();
    await animalService.remove(createdAnimal.id);
    const deletedAnimal = await animalService.findOneById(createdAnimal.id);
    expect(deletedAnimal).toBeUndefined();
    done();
  });

  let counter = 0;
  function createRandomAnimal (): Promise<Animal> {
    // TODO: find out how to drop table in typeorm...
    const email = Math.random() + (counter++).toString() + '@gmail.com';
    const animal: Animal = {
      name: 'Mouse',
      pic: 'none'
    };
    return animalService.create(animal);
  }

});
