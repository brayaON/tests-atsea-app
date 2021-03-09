import { del } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import * as chai from 'chai';

const expect = chai.expect;

describe('Delete customer tests', () => {

    // A customer that it's already created
    const customer = {
        "customerId" : 1,
        "name"       : "Sally Vallery",
        "address"    : "144 Townsend, San Francisco 99999",
        "email"      : "sally@example.com",
        "phone"      : "513 222 5555",
        "username"   : "sallyv",
        "password"   : "sallypassword",
        "enabled"    : "true",
        "role"       : "USER"
    };

    describe('When deleting a customer by a valid id', () => {
        it('Then the customer should be deleted', async () => {
            const response = await del(`http://localhost:8080/api/customer/${customer.customerId}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
            console.log(response.body);
            expect(response.status).to.equal(StatusCodes.NO_CONTENT);
        });
    });

    describe('When deleting all customers', () => {
        it('Then all customers should be deleted', async () => {
            const response = await del(`http://localhost:8080/api/customer/`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
            console.log(response.body);
            expect(response.status).to.equal(StatusCodes.NO_CONTENT);
        });
    });

});