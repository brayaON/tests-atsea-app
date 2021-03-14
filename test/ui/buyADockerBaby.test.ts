import { browser, $ } from 'protractor';
import { post, del } from 'superagent';
import * as chai from 'chai';
const expect = chai.expect

let customerId = -1;
let userName;
let urlBase = "http://3.18.251.171:8080";

describe('Purchase of a DockerBaby', () => {

  describe('When opening the API Page', () => {
    beforeEach(async () => {
      await browser.get(urlBase);
      await browser.sleep(3000);
      userName = Math.floor(Math.random() * 10);
      const customer = {
        "customerId": 0,
        "name": "user_name",
        "address": "user_address",
        "email": "user_email",
        "phone": "user_phone",
        "username": userName.toString(),
        "password": "u",
        "enabled": "true",
        "role": "USER"
      };
      await post(`${urlBase}/api/customer/`)
        .set('User-Agent', 'agent')
        .set('Content-Type', 'application/json')
        .send(customer)
        .then(response => { customerId = response.body.customerId; })
        .catch( error => { console.log(error.message)});
      //console.log(response.status + "\n" + response.body + "\n" + response.error);
      
    });

    it('then should have a title', async () => {
      const title = await browser.getTitle();
      expect(title).to.equal('Atsea Shop');
    });

  });

  describe('When logging an user', () => {
    it('Then the user should be logged in', async () => {
      await $('.buttonSection > div > button:nth-child(2)').click();
      await browser.sleep(3000);
      await $('.loginFormRow > div:nth-child(1) > div > input').sendKeys(userName.toString());
      await $('.loginFormRow > div:nth-child(2) > div > input').sendKeys('u');
      await $('.loginFormButton > button:nth-child(1)').click();
      await browser.sleep(3000);
    });
  });

  describe('When adding the docker baby to the cart', () => {

    it('Then the docker baby should be added to the cart', async () => {
      await $('.productListWrapper > div:nth-child(6) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > button:nth-child(1)').click();
      browser.sleep(3000);
      await $('.checkout-button > a:nth-child(1)').click()
      browser.sleep(3000);
    })
  });

  describe('When doing the payment process', () => {
    
    afterEach(async () => {
      await del(`${urlBase}/api/customer/${customerId}`)
        .set('User-Agent', 'agent')
        .set('Content-Type', 'application/json');
    });


    it('Then the baby docker should be purchased', async () => {
      await $('.infoSection > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > input').sendKeys('user_name');
      browser.sleep(1000);
      await $('.infoSection > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > input').sendKeys('user_lastname');
      browser.sleep(1000);
      /*
      await $('.infoSection > form:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > input').sendKeys('100030202');
      browser.sleep(1000);
      await $('.infoSection > form:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > input').sendKeys('user_cvv');
      browser.sleep(1000);
      await $('div.infoRow:nth-child(4) > div:nth-child(1) > div:nth-child(1) > input').sendKeys('mmyy');
      browser.sleep(1000);
      await $('.infoSection > form:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > input').sendKeys('user_company');
      browser.sleep(1000);
      await $('.infoSection > form:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > input').sendKeys('user_title');
      browser.sleep(1000);
      await $('.infoSection > form:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > input').sendKeys('user_address');
      browser.sleep(1000);
      await $('.infoSection > form:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > input').sendKeys('user_city');
      browser.sleep(1000);
      console.log($('.loginErrorMessage').getText());
      */
      await $('.infoButton > button:nth-child(2)').click();
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
