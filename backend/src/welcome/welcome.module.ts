import { Module } from '@nestjs/common';
import {WelcomeHtmlController} from './welcome-html-router';

@Module({
  controllers: [WelcomeHtmlController],
})
export class WelcomeModule {}
