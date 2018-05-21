import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getJumboH1() {
    return element(by.id('jumbo-title')).getText();
  }
}
