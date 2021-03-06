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
    args: ['--headless', '--disable-gpu', '--window-size=1920,1080']
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
  seleniumAddress: 'http://3.18.251.171:4444',
  SELENIUM_PROMISE_MANAGER: false,
  mochaOpts: {
    timeout: 18000,
	  reporter: 'mochawesome-screenshots',
    reporterOptions: {
      reportName: "report",
      multiReport: true,
    }
  },
  getPageTimeout:30000,
  onPrepare: () => {
    browser.ignoreSynchronization = true;
  }
};
