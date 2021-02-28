const dotenv = require('dotenv');
dotenv.config();

import express = require("express");
const app = express();

app.use(express.json()) 

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

const vaccinationAddressesController = require('./controller/VacciantionAddressController');
app.use('/addresses', vaccinationAddressesController);

const patientController = require('./controller/PatientController');
app.use('/patients', patientController);

module.exports = app;