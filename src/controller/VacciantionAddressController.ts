const router: express.Router = require('express').Router();
import express = require("express");
import VaccinationAddress from "../model/VaccinationAddress";
import VaccinationAddressAgenda from "../model/VaccinationAddressAgenda";
import VaccinationService from '../service/VaccinationAddresService';
import handleResponse from "./ResponseHandler"

const service = new VaccinationService();

router.get('/', (request: express.Request, response: express.Response) => { 
    handleResponse(service.list(), response);
})

router.post('/', (request: express.Request, response: express.Response) => { 
    const body: VaccinationAddress = Object.assign(new VaccinationAddress(), request.body);

    handleResponse(service.save(body), response);
});

router.delete('/:id', (request: express.Request, response: express.Response) => { 
    const { id } = request.params;

    handleResponse(service.delete(Number(id)), response);
});

router.post('/agenda', (request: express.Request, response: express.Response) => { 
    const body: VaccinationAddressAgenda = Object.assign(new VaccinationAddressAgenda(), request.body);

    handleResponse(service.saveAgenda(body), response);
});

router.get('/agenda', (request: express.Request, response: express.Response) => { 
    const { date, address } = request.query;

    handleResponse(service.getAgenda(<string>date, Number(address)), response);
});

module.exports = router