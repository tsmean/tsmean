import {Component, Inject} from '@nestjs/common';
import {FindManyOptions, Repository} from 'typeorm';
import {DeepPartial} from 'typeorm/common/DeepPartial';

import {User} from './user.entity';
import {USER_REPOSITORY_TOKEN} from './constants';
import {HASHING_ALGORITHM, PASSWORD_CRYPTOGRAPHER_TOKEN} from '../auth/constants';
import {IUser} from '@tsmean/shared';
import {Log} from '../logger/logger';
import {UserRole} from './user.role';
import {PasswordCryptographerService} from '../auth/password-cryptographer/password-cryptographer.interface';

@Component()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN) private readonly userRepository: Repository<User>,
    private readonly log: Log,
    @Inject(PASSWORD_CRYPTOGRAPHER_TOKEN) private readonly passwordCryptographerService: PasswordCryptographerService
  ) {}

  // Create
  // Precondition: the user needs to have a unique email address
  async create(userDto: IUser, password: string): Promise<User> {
    this.log.debug('trying to create user...');

    const existingUser = await this.userRepository.findOne({where: {email: userDto.email}});
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = this.userRepository.create(userDto);
    user.role = UserRole.Regular;
    user.password = {
      hash: await this.passwordCryptographerService.doHash(password),
      algorithm: HASHING_ALGORITHM
    };

    const savedUser = await this.userRepository.save(user);
    this.log.debug(JSON.stringify(savedUser));
    return savedUser;
  }

  // Read
  async find(findOptions?: FindManyOptions<User>): Promise<User[]> {
    const options = {
      take: 100,
      skip: 0,
      ...findOptions // overwrite default ones
    };
    this.log.debug(`searching for max ${options.take} users with an offset of ${options.skip} ...`);
    return await this.userRepository.find(options);
  }

  async findOneById(id: number): Promise<User> {
    this.log.debug('trying to find one user by id...');
    return await this.userRepository.findOneById(id);
  }

  findOneByEmail(email: string): Promise<User> {
    this.log.debug('trying to find one user by email...');
    return this.userRepository.findOne({
      email: email
    });
  }

  emailIsTaken(email: string): Promise<boolean> {
    this.log.debug('checking if email is taken...');
    return this.findOneByEmail(email).then(user => {
      return !!user;
    });
  }

  // Update
  async update(id: number, partialEntry: DeepPartial<User>): Promise<void> {
    this.log.debug('trying to update user...');
    return await this.userRepository.updateById(id, partialEntry);
  }

  // Delete
  async remove(id: number): Promise<void> {
    this.log.debug('trying to remove user...');
    return await this.userRepository.removeById(id);
  }
}
