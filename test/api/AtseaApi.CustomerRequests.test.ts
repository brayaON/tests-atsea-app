import { post } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import * as chai from 'chai';

const expect = chai.expect;

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
        const response = await post('http://localhost:8080/api/customer/')
            .set('User-Agent', 'agent')
            .set('Content-Type', 'application/json')
            .send(customer);
        expect(response.status).to.equal(StatusCodes.CREATED);
        expect(response.body).to.have.property('customerId');
    });
});