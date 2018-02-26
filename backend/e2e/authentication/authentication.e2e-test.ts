import * as express from 'express';
import * as request from 'supertest';
import {Test} from '@nestjs/testing';

import {AuthModule} from '../../src/auth/auth.module';
import {PASSWORD_CRYPTOGRAPHER_TOKEN} from '../../src/auth/constants';
import {UserModule} from '../../src/user/user.module';
import {UserService} from '../../src/user/user.service';
import {User} from '../../src/user/user.entity';
import {UserRole} from '../../src/user/user.role';
import {IUser} from '@tsmean/shared';

describe('Authentication system', () => {
  const server = express();
  server.use((req, res, next) => {
    if (req.query.mockUser === 'true') {
      req.user = {id: 1, role: UserRole.Admin};
    }
    next();
  });

  const userServiceMock = {
    async create(user: IUser, password: string) {
      return {id: 1, role: UserRole.Admin, email: user.email};
    },
    async findOneByEmail(email: string) {
      console.log('findOneByEmail', email);
      return {id: 1, role: UserRole.Admin, email, password: {hash: 'hash'}};
    }
  };

  const passwordCryptographerMock = {
    doCompare(password: string, hash: string) {
      return hash === 'hash';
    }
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [UserModule, AuthModule]
    })
      .overrideComponent(UserService)
      .useValue(userServiceMock)
      .overrideComponent(PASSWORD_CRYPTOGRAPHER_TOKEN)
      .useValue(passwordCryptographerMock)
      .compile();

    const app = module.createNestApplication(server);
    await app.init();
  });

  it('should successfully register new user', async () => {
    const response = await request(server)
      .post('/api/v1/users')
      .send({
        user: {
          email: 'test@test.test'
        },
        password: 'qwerty123'
      });
    const data = response.body.data.data;

    expect(response.status).toEqual(201);
    expect(data.id).toEqual(1);
    expect(data.email).toEqual('test@test.test');
  });

  it('should successfully login user', async () => {
    const response = await request(server)
      .post('/api/v1/auth')
      .send({
        email: 'test@test.test',
        password: 'qwerty123'
      });

    const data = response.body.data;

    expect(response.status).toEqual(201);
    expect(data.token).toBeDefined();
    expect(data.user.id).toEqual(1);
    expect(data.user.email).toEqual('test@test.test');
  });

  it('should fail to login when email is invalid', async () => {
    const response = await request(server)
      .post('/api/v1/auth')
      .send({
        email: 'test',
        password: 'qwerty123'
      });

    const data = response.body.data;

    expect(response.status).toEqual(400);
  });
});
