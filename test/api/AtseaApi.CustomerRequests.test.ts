import { post, get } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import * as chai from 'chai';

const expect = chai.expect;

describe('API tests', () => {
    let customerId = 0;
    describe('When creating a customer', () => {
        it('Then a customer should be created', async () => {
            const customer = {
                "customerId": 0,
                "name": "Sally Vallery",
                "address": "144 Townsend, San Francisco 99999",
                "email": "sally@example.com",
                "phone": "513 222 5555",
                "username": "sallyv",
                "password": "sallypassword",
                "enabled": "true",
                "role": "USER"
            };
            await post('http://localhost:8080/api/customer/')
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
                .send(customer)
                .then(response => {
                    expect(response.status).to.equal(StatusCodes.CREATED);
                    expect(response.body).to.have.property('customerId');
                    customerId = response.body.customerId;
                })
                .catch(error => {
                    expect(error.status).to.equal(StatusCodes.CONFLICT);
                });
        });

    });

    describe('When getting a customer', () => {
        it('Then a customer should be displayed', async () => {
            await get(`http://localhost:8080/api/customer/${customerId}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
                .then(response => {
                    expect(response.status).to.equal(StatusCodes.OK);
                    expect(response.body).to.have.property('customerId');
                    expect(response.body.customeId).to.equal(customerId);
                })
                .catch(error => {
                    expect(error.status).to.equal(StatusCodes.NOT_FOUND);
                });
        });

    });
})
