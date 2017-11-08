import {appConfig} from './config/app-config';
import { NestFactory } from '@nestjs/core';
import {AppModule} from './app.module';
import * as bodyParser from 'body-parser';
import {ValidationPipe} from './common/pipes/validation.pipe';

export function main() {

  appConfig.setAppConfig(process.argv[2] || 'local');

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(bodyParser.json());
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(4242);
  }
  bootstrap();

};

main();
