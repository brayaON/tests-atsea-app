import { get } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import * as chai from 'chai';

const expect = chai.expect;

describe('Get customer tests', () => {

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

    describe('When getting a customer by a valid id', () => {
        it('Then a customer should be displayed', async () => {
            const response = await get(`http://localhost:8080/api/customer/${customer.customerId}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
            console.log(response.body);
            expect(response.status).to.equal(StatusCodes.OK);
            expect(response.body).to.have.property('customerIf');
            expect(response.body.customerIf).to.equal(customer.customerId);
        });
    });

    describe('When getting a customer by a invalid id', () => {
        let notFoundId = customer.customerId + 100;
        it('Then a customer shouldn\'t be displayed', async () => {
            await get(`http://localhost:8080/api/customer/${notFoundId}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
                .catch(error => {
                    expect(error.status).to.equal(StatusCodes.NOT_FOUND);
                });
        });
    });

    describe('When getting a customer by valid name', () => {
        it('Then a customer should be displayed', async () => {
            const response = await get(`http://localhost:8080/api/customer/name=${customer.name}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json');
            expect(response.status).to.equal(StatusCodes.OK);
            expect(response.body).to.have.property('name');
            expect(response.body.name).to.equal(customer.name);
        });
    });

    describe('When getting a customer by invalid name', () => {
        let notFoundName = "thisNameDoesNotExists";
        it('Then a customer shouldn\'t be displayed', async () => {
            await get(`http://localhost:8080/api/customer/name=${notFoundName}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
                .catch(error => {
                    expect(error.status).to.equal(StatusCodes.NOT_FOUND);
                });
        });
    });

    describe('When getting a customer by valid username', () => {
        it('Then a customer should be displayed', async () => {
            const response = await get(`http://localhost:8080/api/customer/username=${customer.username}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json');
            expect(response.status).to.equal(StatusCodes.OK);
            expect(response.body).to.have.property('username');
            expect(response.body.username).to.equal(customer.username);
        });
    });

    describe('When getting a customer by invalid username', () => {
        let notFoundUsername = "thisUsernameDoesNotExists";
        it('Then a customer shouldn\'t be displayed', async () => {
            await get(`http://localhost:8080/api/customer/username=${notFoundUsername}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
                .catch(error => {
                    expect(error.status).to.equal(StatusCodes.NOT_FOUND);
                });
        });
    });
});