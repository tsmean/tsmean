import {appConfig} from './config/app-config';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import {ValidationPipe} from '@nestjs/common';

export function main() {
  appConfig.setAppConfig(process.argv[2] || 'local');

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(bodyParser.json());
    app.useGlobalPipes(new ValidationPipe());

    // Allow CORS since frontend is served completely independently
    app.use(cors());

    const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 4242;
    await app.listen(port);
  }

  bootstrap();
}

main();
