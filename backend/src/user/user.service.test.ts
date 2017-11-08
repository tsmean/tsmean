import {Test} from '@nestjs/testing';
import {UserService} from './user.service';
import {userProviders} from './user.providers';
import {databaseProviders} from '../database/database.providers';
import {IUser} from '../../../shared/src/models/user.model';
import {Log} from '../logger/logger';

describe('user service', () => {

  let userService: UserService;

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
        ...userProviders,
        UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be able to create a user', (done) => {
    createRandomUser().then(resp => {
      if (resp.id !== undefined) {
        done();
      }
    });
  });

  it('should be able to find all users', (done) => {
    userService.find().then(resp => {
      expect(Array.isArray(resp)).toBe(true);
      done();
    });
  });

  it('should be able to find one user by email', async (done) => {
    const createdUser = await createRandomUser();
    const foundUser = await userService.findOneByEmail(createdUser.email);
    expect(!!foundUser).toBe(true);
    expect(foundUser.email).toBe(createdUser.email);
    done();
  });

  it('should be able to find one user by id', async (done) => {
    const createdUser = await createRandomUser();
    const foundUser = await userService.findOneById(createdUser.id);
    expect(!!foundUser).toBe(true);
    expect(foundUser.id).toBe(createdUser.id);
    done();
  });

  it('should be able to check if email is taken', async (done) => {
    const createdUser = await createRandomUser();
    const emailIsTaken = await userService.emailIsTaken(createdUser.email);
    expect(emailIsTaken).toBe(true);
    done();
  });

  it('should be able to check if email is untaken', async (done) => {
    const emailIsTaken = await userService.emailIsTaken('bladi@blub.com');
    expect(emailIsTaken).toBe(false);
    done();
  });

  it('should be able to update user', async (done) => {
    const createdUser = await createRandomUser();
    await userService.update(createdUser.id, {firstName: 'Bernhard'});
    const updatedUser = await userService.findOneById(createdUser.id);
    expect(updatedUser).not.toBeUndefined();
    expect(updatedUser.firstName).toBe('Bernhard');
    done();
  });

  it('should be able to remove user', async (done) => {
    const createdUser = await createRandomUser();
    await userService.remove(createdUser.id);
    const deletedUser = await userService.findOneById(createdUser.id);
    expect(deletedUser).toBeUndefined();
    done();
  });

  let counter = 0;
  function createRandomUser (): Promise<IUser> {
    // TODO: find out how to drop table in typeorm...
    const email = Math.random() + (counter++).toString() + '@gmail.com';
    const user: IUser = {
      email: email,
      firstName: 'Gertrud',
      lastName: 'Müller'
    };
    return userService.create(user, 'mySuperSecurePasswordIXJAJA');
  }

});
