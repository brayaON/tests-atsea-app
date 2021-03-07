const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');

const { expect } = chai;

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
        const response = await agent.post('https://localhost:8080/atsea/api/customer/')
            .set('User-Agent', 'agent')
            .set('Content-Type', 'application/json')
            .send(customer);
        expect(response.status).to.equal(StatusCode.OK);
        expect(response.body).to.have.property('customerId');
    });
});