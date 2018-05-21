import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {INestApplication, ValidationPipe} from '@nestjs/common';
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

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('tsmean sample api')
    .addTag('Animals')
    .addTag('Animal lists')
    .addTag('Users')
    .setDescription('Sample REST API that allows to manage list of animals')
    .setVersion('1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/swagger', app, swaggerDocument);

  const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 4242;
  await app.listen(port);
}

bootstrap();
