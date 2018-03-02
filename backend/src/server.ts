import {NestFactory} from '@nestjs/core';
import {ValidationPipe, INestApplication} from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import {AppModule} from './app.module';
import {AuthGuard} from './auth/auth.guard';
import {AuthModule} from './auth/auth.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  app.use(bodyParser.json());
  app.useGlobalPipes(new ValidationPipe());

  const authGuard = app.select(AuthModule).get(AuthGuard);
  app.useGlobalGuards(authGuard);

  // Allow CORS since frontend is served completely independently
  app.use(cors());

  const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 4242;
  await app.listen(port);
}

bootstrap();
