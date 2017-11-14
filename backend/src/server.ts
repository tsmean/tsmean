import {appConfig} from './config/app-config';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as bodyParser from 'body-parser';
import {ValidationPipe} from './common/pipes/validation.pipe';

export function main() {

  appConfig.setAppConfig(process.argv[2] || 'local');

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(bodyParser.json());
    app.useGlobalPipes(new ValidationPipe());

    // Allow CORS since frontend is served completely independently
    app.use(function (req, res, next) {
      const allowedOrigins = ['http://localhost:4242', 'https://www.tsmean.com'];
      const origin = req.headers.origin;
      if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
      }
      res.header('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE, PATCH');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

    await app.listen(4242);
  }

  bootstrap();

};

main();
