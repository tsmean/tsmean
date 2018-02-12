import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import {UserModule} from '../../src/user/user.module';
import {UserService} from '../../src/user/user.service';

describe('User e2e', () => {
  const server = express();
  server.use(bodyParser.json());

  const userService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      modules: [
        UserModule
      ],
    })
      .overrideComponent(UserService).useValue(userService)
      .compile();

    const app = module.createNestApplication(server);
    await app.init();
  });

  it(`/GET users`, () => {
    return request(server)
      .get('/users')
      .expect(200)
      .expect({
        data: userService.findAll(),
      });
  });
});
