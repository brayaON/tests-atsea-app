import { browser } from 'protractor';
import * as chai from 'chai';
const expect = chai.expect
/*
describe('When opening the API Page', () => {
    beforeEach(async () => {
        await browser.get('http://localhost:8080/index.html#/?_k=zaehma');
    });

    it('then should have a title', async () => {
        await expect(browser.getTitle()).toEqual('Atsea Shop');
    });
});*/

describe('Given a SDET learning protractor', () => {
    describe('when open Google Page', () => {
      beforeEach(async () => {
        await browser.get('http://www.google.com');
      });
  
      it('then should have a title', async () => {
        const title = await browser.getTitle();
        expect(title).to.equal('Google');
      });
    });
  });