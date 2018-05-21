import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getJumboH1() {
    return element(by.css('app-jumbotron h1')).getText();
  }
}
