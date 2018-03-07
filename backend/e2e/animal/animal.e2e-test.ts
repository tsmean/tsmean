import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as request from 'supertest';
import {Test} from '@nestjs/testing';

import {AnimalModule} from '../../src/animal/animal.module';
import {AnimalService} from '../../src/animal/animal.service';

describe('Animal e2e', () => {
  const server = express();
  server.use(bodyParser.json());

  const animalServiceMock = {
    find: () => ['test']
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      modules: [AnimalModule]
    })
      .overrideComponent(AnimalService)
      .useValue(animalServiceMock)
      .compile();

    const app = module.createNestApplication(server);
    await app.init();
  });

  it(`/GET /api/v1/animals`, async () => {
    const response = await request(server).get('/api/v1/animals');

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toEqual(animalServiceMock.find());
  });
});
