// import * as chai from 'chai';
// import chaiHttp from 'chai-http';
// chai.use(chaiHttp);

// import * as chai from 'chai';
// import * as http from 'chai-http';
// chai.use(http);

var chai = require('chai'), chaiHttp = require('chai-http');

chai.use(chaiHttp);

const express = require('../../src/index');

let app = express.app;

const assert = chai.assert;

import Patient from '../../src/model/Patient'
import VaccinationAddress from '../../src/model/VaccinationAddress';
import VaccinationAddressAgenda from '../../src/model/VaccinationAddressAgenda';

after(() => { 
    process.exit();
});

describe('Patient', () => {

    it('it should POST patient successfully', (done) => {
    
    let random = Math.random().toString(36).substring(7);
    const patient = new Patient();
    patient.name = `John Doe ${random}`;
    patient.birthday = new Date(1950,1,6);
    patient.zipCode = '60165121';
    
    (<any>chai).request(app)
        .post('/patients')
        .send(patient)
        .end((err: any, res: any) => {
            assert.isNull(err);
            assert.equal(res.status, 200);
            assert.isNotNull(res.body);
            done();
        });
    });

    it('it should fail Patient with less than 65 years', (done) => {
    
        let random = Math.random().toString(36).substring(7);
        const patient = new Patient();
        patient.name = `John Doe ${random}`;
        patient.birthday = new Date(2000,1,6);
        patient.zipCode = '60165121';
    
        (<any>chai).request(app)
        .post('/patients')
        .send(patient)
        .end((err: any, res: any) => {
            assert.isNull(err);
            assert.equal(res.status, 400);
            assert.isNotNull(res.body);
            assert.equal(res.body.message, 'Only people with 65 years or more can request vaccination');
            done();
        });
    });

    it('it should fail Patient with invalid zipCode', (done) => {
    
        let random = Math.random().toString(36).substring(7);
        const patient = new Patient();
        patient.name = `John Doe ${random}`;
        patient.birthday = new Date(1940,1,6);
        patient.zipCode = '60000000';
    
        (<any>chai).request(app)
        .post('/patients')
        .send(patient)
        .end((err: any, res: any) => {
            assert.isNull(err);
            assert.equal(res.status, 400);
            assert.isNotNull(res.body);
            assert.equal(res.body.message, 'Todos os serviços de CEP retornaram erro.');
            done();
        });
    });
});

describe('Vaccination Address', () => {

    it('it should fail address with invalid zipcode', (done) => {
    
    let random = Math.random().toString(36).substring(7);
    const address = new VaccinationAddress();
    address.name = `John Doe's house number ${random}`;
    address.zipcode = '60000000';
    
    (<any>chai).request(app)
        .post('/addresses')
        .send(address)
        .end((err: any, res: any) => {
            assert.isNull(err);
            assert.equal(res.status, 400);
            assert.isNotNull(res.body);
            assert.equal(res.body.message, 'Todos os serviços de CEP retornaram erro.');
            done();
        });
    });
});


describe('Vaccination Agenda', () => {

    it('it should fail creation of agenda with more than 100 doses', (done) => {
    
    let random = Math.random().toString(36).substring(7);
    const agenda = new VaccinationAddressAgenda();
    const address = new VaccinationAddress(
        1,'Address 1', '60165121'
    );
    agenda.address = address;
    agenda.capacity = 101;
    agenda.date= new Date();
    
    (<any>chai).request(app)
        .post('/addresses/agenda')
        .send(agenda)
        .end((err: any, res: any) => {
            assert.isNull(err);
            assert.equal(res.status, 400);
            assert.isNotNull(res.body);
            assert.equal(res.body.message, 'Capacity cannot be grater than 100 units');
            done();
        });
    });
});
