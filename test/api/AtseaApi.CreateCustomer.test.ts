import { post } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import * as chai from 'chai';

const expect = chai.expect;

describe('Create Customer tests', () => {
    let customerId = -1;
    let customerName = "";
    let customerUsername = "";
    describe('When creating a valid customer', () => {
        it('Then a customer should be created', async () => {
            const customer = {
                "customerId": 8,
                "name": "User8 Example",
                "address": "144 Townsend, San Francisco 99999",
                "email": "user8@example.com",
                "phone": "513 222 5555",
                "username": "userex8",
                "password": "userex8pass",
                "enabled": "true",
                "role": "USER"
            };
            customerName = customer.name;
            customerUsername = customer.username;
            customerId = customer.customerId;
            const response = await post('http://localhost:8080/api/customer/')
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
                .send(customer);
            expect(response.status).to.equal(StatusCodes.CREATED);
            expect(response.body).to.have.property('customerId');
            expect(response.body.customerId).to.equal(customerId);
        });
    });

    describe('When creating a invalid customer', () => {
        it('Then a customer shouldn\'t be created', async () => {
            const customer = {
                "customerId" : customerId,
                "name"       : customerName,
                "address"    : "144 Townsend, San Francisco 99999",
                "email"      : "sally@example.com",
                "phone"      : "513 222 5555",
                "username"   : customerUsername,
                "password"   : "sallypassword",
                "enabled"    : "true",
                "role"       : "USER"
            };
            await post('http://localhost:8080/api/customer/')
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
                .send(customer)
                .catch(error => {
                    expect(error.status).to.equal(StatusCodes.CONFLICT);
                })
        });
    });
});
