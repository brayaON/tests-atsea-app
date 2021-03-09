import { post, get, put, del } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import * as chai from 'chai';

const expect = chai.expect;

let customerId = -1;
let customerName = "";
let customerUsername = "";

describe('Create Customer tests', () => {

    describe('When creating a valid customer', () => {
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
            customerName = customer.name;
            customerUsername = customer.username;
            const response = await post('http://localhost:8080/api/customer/')
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
                .send(customer);
            expect(response.status).to.equal(StatusCodes.CREATED);
            expect(response.body).to.have.property('customerId');
            customerId = response.body.customerId;
        });
    });

    describe('When creating an invalid customer', () => {
        it('Then a customer shouldn\'t be created', async () => {
            const customer = {
                "customerId": customerId,
                "name": customerName,
                "address": "144 Townsend, San Francisco 99999",
                "email": "sally@example.com",
                "phone": "513 222 5555",
                "username": customerUsername,
                "password": "sallypassword",
                "enabled": "true",
                "role": "USER"
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


describe('Get customer tests', () => {

    describe('When getting a customer by a valid id', () => {
        it('Then a customer should be displayed', async () => {
            const response = await get(`http://localhost:8080/api/customer/${customerId}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
            expect(response.status).to.equal(StatusCodes.OK);
            expect(response.body).to.have.property('customerIf');
            expect(response.body.customerIf).to.equal(customerId);
        });
    });

    describe('When getting a customer by an invalid id', () => {
        let notFoundId = -1;
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
            const response = await get(`http://localhost:8080/api/customer/name=${customerName}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json');
            expect(response.status).to.equal(StatusCodes.OK);
            expect(response.body).to.have.property('name');
            expect(response.body.name).to.equal(customerName);
        });
    });

    describe('When getting a customer by an invalid name', () => {
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
            const response = await get(`http://localhost:8080/api/customer/username=${customerUsername}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json');
            expect(response.status).to.equal(StatusCodes.OK);
            expect(response.body).to.have.property('username');
            expect(response.body.username).to.equal(customerUsername);
        });
    });

    describe('When getting a customer by an invalid username', () => {
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


describe('Update customer tests', () => {

    describe('When updating a valid customer', () => {
        it('Then a customer should be updated', async () => {
            const customer = {
                "customerId": customerId,
                "name": "Sally Vallery",
                "address": "my new address",
                "email": "sally@example.com",
                "phone": "phone as string",
                "username": "sallyv",
                "password": "sallynewpassword",
                "enabled": "true",
                "role": "USER"
            };
            const response = await put(`http://localhost:8080/api/customer/${customerId}`)
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

describe('Delete customer tests', () => {

    describe('When deleting a customer by a valid id', () => {
        it('Then the customer should be deleted', async () => {
            const response = await del(`http://localhost:8080/api/customer/${customerId}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json');
            expect(response.status).to.equal(StatusCodes.NO_CONTENT);
        });
    });

    describe('When deleting a customer by an invalid id', () => {
        let notFoundId = -1;
        it('Then a customer shouldn\'t be deleted', async () => {
            await del(`http://localhost:8080/api/customer/${notFoundId}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
                .catch(error => {
                    expect(error.status).to.equal(StatusCodes.NOT_FOUND);
                });
        });
    });

    describe('When deleting all customers', () => {
        it('Then all customers should be deleted', async () => {
            const response = await del(`http://localhost:8080/api/customer/`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json');
            expect(response.status).to.equal(StatusCodes.NO_CONTENT);
        });
    });

});