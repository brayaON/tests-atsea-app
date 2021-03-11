import { browser } from 'protractor';
import * as chai from 'chai';
const expect = chai.expect

describe('When opening the API Page', () => {
    beforeEach(async () => {
        await browser.get('http://192.168.1.111:8080/');
    });

    it('then should have a title', async () => {
      const title = await browser.getTitle();
      expect(title).to.equal('Atsea Shop');
    });
});