import * as express from 'express';
import * as request from 'supertest';
import {Test} from '@nestjs/testing';

import {UserModule} from '../../src/user/user.module';
import {UserService} from '../../src/user/user.service';
import {User} from '../../src/user/user.entity';
import {UserRole} from '../../src/user/user.role';
import {AnimalModule} from '../../src/animal/animal.module';
import {AnimalService} from '../../src/animal/animal.service';

describe('Auth guard', () => {
  const server = express();
  server.use((req, res, next) => {
    if (req.query.mockUser === 'true') {
      req.user = {id: 1, role: UserRole.Admin};
    }
    next();
  });

  const userServiceMock = {
    find() {
      return [{id: 1, role: UserRole.Admin}];
    }
  };
  const animalServiceMock = {
    find() {
      return [{id: 1, name: 'Panda'}];
    }
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [UserModule, AnimalModule]
    })
      .overrideComponent(UserService)
      .useValue(userServiceMock)
      .overrideComponent(AnimalService)
      .useValue(animalServiceMock)
      .compile();

    const app = module.createNestApplication(server);
    await app.init();
  });

  it(`should restrict access for guarded route when user role is incorrect`, async () => {
    const response = await request(server).get('/api/v1/users');

    expect(response.statusCode).toEqual(403);
  });

  it(`should allow access for guarded route when user role is correct`, async () => {
    const response = await request(server).get('/api/v1/users?mockUser=true');

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toEqual(userServiceMock.find());
  });

  it(`should allow access for non guarded route`, async () => {
    const response = await request(server).get('/api/v1/animals');

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toEqual(animalServiceMock.find());
  });
});
