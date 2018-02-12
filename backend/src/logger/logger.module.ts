import { Module } from '@nestjs/common';
import {Log} from './logger';

@Module({
  components: [Log],
  exports: [Log],
})
export class LoggerModule {}
