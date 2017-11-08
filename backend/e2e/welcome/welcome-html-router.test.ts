import {WelcomeHtmlController} from '../../src/welcome/welcome-html-router';
import { Test } from '@nestjs/testing';

describe('Test simple welcome Html Router', () => {

  let welcomeRouter: WelcomeHtmlController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [WelcomeHtmlController]
    }).compile();

    welcomeRouter = module.get<WelcomeHtmlController>(WelcomeHtmlController);
  });

  it('should return html containing the word welcome', async () => {
    // TODO: How can I test this?
    // expect(await welcomeRouter.welcome()).toContain('Welcome');
  });

});
