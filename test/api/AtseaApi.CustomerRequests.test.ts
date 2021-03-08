import { post, get, put } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import * as chai from 'chai';

const expect = chai.expect;

describe('API tests', () => {
    let customerId = 0;
    let customerName = "";
    let customerUsername = "";
    describe('When creating a customer', () => {
        it('Then a customer should be created', async () => {
            const customer = {
                "customerId": 2,
                "name": "User Example",
                "address": "144 Townsend, San Francisco 99999",
                "email": "user@example.com",
                "phone": "513 222 5555",
                "username": "userex",
                "password": "userexpass",
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
                    expect(response.body).to.have.property('name');
                    customerName = response.body.name;
                    expect(response.body).to.have.property('username');
                    customerUsername = response.body.username;
                })
                .catch(error => {
                    console.log(error.status);
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
                    expect(response.body.customerId).to.equal(customerId);
                })
                .catch(error => {
                    expect(error.status).to.equal(StatusCodes.NOT_FOUND);
                });
        });
    });

    describe('When getting a customer by name', () => {
        it('Then a customer should be displayed', async () => {
            await get(`http://localhost:8080/api/customer/name=${customerName}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
                .then(response => {
                    expect(response.status).to.equal(StatusCodes.OK);
                    expect(response.body).to.have.property('name');
                    expect(response.body.name).to.equal(customerName);
                })
                .catch(error => {
                    expect(error.status).to.equal(StatusCodes.NOT_FOUND);
                });
        });
    });

    describe('When getting a customer by username', () => {
        it('Then a customer should be displayed', async () => {
            await get(`http://localhost:8080/api/customer/username=${customerUsername}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
                .then(response => {
                    expect(response.status).to.equal(StatusCodes.OK);
                    expect(response.body).to.have.property('username');
                    expect(response.body.username).to.equal(customerUsername);
                })
                .catch(error => {
                    expect(error.status).to.equal(StatusCodes.NOT_FOUND);
                });
        });
    });

    describe('When updating a customer', () => {
        it('Then a customer should be updated', async () => {
            const customer = {
                "customerId": 0,
                "name": "Sally Vallery",
                "address": "my new address",
                "email": "sally@example.com",
                "phone": "phone as string",
                "username": "sallyv",
                "password": "sallynewpassword",
                "enabled": "true",
                "role": "USER"
            }

            await put(`http://localhost:8080/api/customer/${customer.customerId}`)
                .set('User-Agent', 'agent')
                .set('Content-Type', 'application/json')
                .send(customer)
                .then(response => {
                    console.log(response.status);
                    expect(response.status).to.equal(StatusCodes.OK);
                    expect(response.body).to.have.property('customerId');
                    expect(response.body.address).to.equal(customer.address);
                    expect(response.body.phone).to.equal(customer.phone);
                    expect(response.body.password).to.equal(customer.password);
                })
                .catch(error => {
                    expect(error.status).to.equal(StatusCodes.NOT_FOUND);
                });
        });

    })
})
