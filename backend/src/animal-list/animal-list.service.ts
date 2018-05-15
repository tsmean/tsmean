import {Component, Inject} from '@nestjs/common';
import {FindManyOptions, Repository} from 'typeorm';
import {DeepPartial} from 'typeorm/common/DeepPartial';
import {Log} from '../logger/logger';
import {ANIMAL_LIST_REPOSITORY_TOKEN} from './constants';
import {AnimalList} from './animal-list.entity';
import {User} from '../user/user.entity';

@Component()
export class AnimalListService {
  constructor(@Inject(ANIMAL_LIST_REPOSITORY_TOKEN) private readonly animalListRepository: Repository<AnimalList>,
              private log: Log) {
    this.ensurePublicList();
  }

  // Create
  async create(animalListEntry: DeepPartial<AnimalList>, owner: User): Promise<AnimalList> {
    const newList = this.animalListRepository.create({
      name: animalListEntry.name,
      owner
    });
    return await this.animalListRepository.save(newList);
  }

  // Read
  async find(findOptions?: FindManyOptions<AnimalList>, owner?: User): Promise<AnimalList[]> {
    const options: FindManyOptions<AnimalList> = {
      take: 100,
      skip: 0,
      ...findOptions // overwrite default ones
    };
    // user's lists + public or only the public one
    const qb = this.animalListRepository
      .createQueryBuilder('animalList')
      .leftJoinAndSelect('animalList.owner', 'owner')
      .where('animalList.owner IS NULL');
    if (owner) {
      qb.orWhere('owner.id = :ownerId', {ownerId: owner.id});
    }
    qb.skip(options.skip).take(options.take);
    return await qb.getMany();
  }

  async findOneById(id: number): Promise<AnimalList> {
    return await this.animalListRepository.findOneById(id);
  }

  // Update
  async update(id: number, partialEntry: DeepPartial<AnimalList>): Promise<AnimalList> {
    const updatedList = await this.animalListRepository.findOneById(id);
    this.animalListRepository.merge(updatedList, partialEntry);
    return await this.animalListRepository.save(updatedList);
  }

  // Delete
  async remove(id: number): Promise<void> {
    return await this.animalListRepository.deleteById(id);
  }

  private async ensurePublicList() {
    let publicList = await this.animalListRepository.findOne({name: 'Public', owner: null});
    if (!publicList) {
      publicList = this.animalListRepository.create({name: 'Public', owner: null});
      await this.animalListRepository.save(publicList);
    }
    return publicList;
  }
}
