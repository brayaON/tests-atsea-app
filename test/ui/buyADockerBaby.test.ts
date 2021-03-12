import { browser, $ } from 'protractor';
import { post, del } from 'superagent';
import * as chai from 'chai';
const expect = chai.expect

let customerId = -1;

describe('Purchase of a DockerBaby', () => {

  describe('When opening the API Page', () => {
    beforeEach(async () => {
      await browser.get('http://192.168.1.13:8080/');
      const customer = {
        "customerId": 0,
        "name": "user_name",
        "address": "user_address",
        "email": "user_email",
        "phone": "user_phone",
        "username": "user_username",
        "password": "user_password",
        "enabled": "true",
        "role": "USER"
      };
      const response = await post('http://localhost:8080/api/customer/')
        .set('User-Agent', 'agent')
        .set('Content-Type', 'application/json')
        .send(customer);
      customerId = response.body.customerId;
    });

    it('then should have a title', async () => {
      const title = await browser.getTitle();
      expect(title).to.equal('Atsea Shop');
    });

  });

  describe('When logging an user', () => {

    it('Then the user should be logged in', async () => {
      await $('.buttonSection > div > button:nth-child(2)').click();
      await (browser.sleep(3000));
      await $('.loginFormRow > div:nth-child(1) > div > input').sendKeys('user_username');
      await (browser.sleep(3000));
      await $('.loginFormRow > div:nth-child(2) > div > input').sendKeys('user_password');
    });
  });

  describe('When adding the docker baby to the cart', () => {

    it('Then the docker baby should be added to the cart', async () => {
      await $('.productListWrapper > div:nth-child(6) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > button:nth-child(1)').click();
      await (browser.sleep(3000));
      await $('.checkout-button > a:nth-child(1)').click()
      await (browser.sleep(3000));
    })
  });

  describe('When doing the payment process', () => {

    afterEach(async () => {
      await del(`http://localhost:8080/api/customer/${customerId}`)
        .set('User-Agent', 'agent')
        .set('Content-Type', 'application/json');
    });

    it('Then the baby docker should be purchased', async () => {
      await $('.infoSection > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > input').sendKeys('user_name');
      await (browser.sleep(3000));
      await $('.infoSection > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > input').sendKeys('user_lastname');
      await (browser.sleep(3000));
      await $('.infoSection > form:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > input').sendKeys('100030202');
      await (browser.sleep(3000));
      await $('.infoSection > form:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > input').sendKeys('user_cvv');
      await (browser.sleep(3000));
      await $('div.infoRow:nth-child(4) > div:nth-child(1) > div:nth-child(1) > input').sendKeys('mmyy');
      await (browser.sleep(3000));
      await $('.infoSection > form:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > input').sendKeys('user_company');
      await (browser.sleep(3000));
      await $('.infoSection > form:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > input').sendKeys('user_title');
      await (browser.sleep(3000));
      await $('.infoSection > form:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > input').sendKeys('user_address');
      await (browser.sleep(3000));
      await $('.infoSection > form:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > input').sendKeys('user_city');
      await (browser.sleep(3000));
      await $('.infoButton > button:nth-child(2)').click();
      await (browser.sleep(3000));
      const successMessage = await $('.successMessage').getText();
      expect(successMessage).to.equal('You have successfully placed an order!');
    });
  });

});

/*afterEach(async () => {
    await del(`http://localhost:8080/api/customer/${customerId}`)
      .set('User-Agent', 'agent')
      .set('Content-Type', 'application/json');
  });*/