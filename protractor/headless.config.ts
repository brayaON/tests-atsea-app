import { Config, browser } from 'protractor';

const firefoxConfig = {
  browserName: 'firefox',
  firefoxOptions: {
    args: ['--headless']
  },
  name: 'firefox-tests',
  shardTestFiles: true,
  maxInstances: 1
};

const chromeConfig = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--headless', '--disable-gpu']
  },
  name: 'chrome-tests',
  shardTestFiles: true,
  maxInstances: 1
};

const multiCapabilities = [chromeConfig, firefoxConfig];

export const config: Config = {
  multiCapabilities,
  framework: 'mocha',
  specs: [ '../test/ui/*js' ],
  seleniumAddress: 'http://0.0.0.0:4444',
  SELENIUM_PROMISE_MANAGER: false,
  mochaOpts: {
	  reporter: 'mochawesome-screenshots'
  },
  getPageTimeout:30000,
  onPrepare: () => {
    browser.ignoreSynchronization = true;
  }
};
