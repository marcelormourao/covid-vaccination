const router: express.Router = require('express').Router();
import express = require("express");
import handleResponse from "./ResponseHandler"
import Patient from "../model/Patient"
import PatientService from "../service/PatientService"
import AttendanceRequest from "../model/AttendanceRequest";

const service = new PatientService();


router.post('/', (request: express.Request, response: express.Response) => { 
    const body: Patient = Object.assign(new Patient(), request.body);

    handleResponse(service.save(body), response);
});

router.post('/attendance', (request: express.Request, response: express.Response) => { 
    const body: AttendanceRequest = Object.assign(new AttendanceRequest(), request.body);

    handleResponse(service.attendanceRequest(body), response);
});

module.exports = router