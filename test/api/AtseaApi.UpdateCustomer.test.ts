import { put } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import * as chai from 'chai';

const expect = chai.expect;

describe('Update customer tests', () => {

    describe('When updating a valid customer', () => {
        it('Then a customer should be updated', async () => {
            const customer = {
                "customerId": 1,
                "name": "Sally Vallery",
                "address": "my new address",
                "email": "sally@example.com",
                "phone": "phone as string",
                "username": "sallyv",
                "password": "sallynewpassword",
                "enabled": "true",
                "role": "USER"
            };

            const response = await put(`http://localhost:8080/api/customer/${customer.customerId}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
                .send(customer);
            expect(response.status).to.equal(StatusCodes.OK);
            expect(response.body).to.have.property('customerId');
            expect(response.body.address).to.equal(customer.address);
            expect(response.body.phone).to.equal(customer.phone);
            expect(response.body.password).to.equal(customer.password);
        });
    });

    describe('When updating a valid customer', () => {
        let notFoundId = -100;
        it('Then a customer should be updated', async () => {
            const customer = {
                "customerId": notFoundId,
                "name": "Sally Vallery",
                "address": "my new address",
                "email": "sally@example.com",
                "phone": "phone as string",
                "username": "sallyv",
                "password": "sallynewpassword",
                "enabled": "true",
                "role": "USER"
            };

            await put(`http://localhost:8080/api/customer/${notFoundId}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
                .send(customer)
                .catch(error => {
                    expect(error.status).to.equal(StatusCodes.NOT_FOUND);
                });
        });

    });
});
