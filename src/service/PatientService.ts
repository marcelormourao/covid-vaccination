import Patient  from '../model/Patient'
import { run } from './DatabaseHelper'
const cep = require('cep-promise')
import Address from '../model/Address'
import AttendanceRequest from '../model/AttendanceRequest'
import VaccinationAddresService from '../service/VaccinationAddresService'
import VaccinationAddressAgenda from '../model/VaccinationAddressAgenda'

class PatientService {

    constructor(
        private runner: (sql: string, params?: any[]) => Promise<any[]> = run
    ) {
    }

    private vaccinationAddresService = new VaccinationAddresService();

    async save(patient: Patient): Promise<Patient> {
        patient.validate();

        return await cep(patient.zipCode)
        .then((address: Address) => {

            const sql: string = 'INSERT INTO tb_patient (name, birthday, zipcode) VALUES ($1, $2, $3) RETURNING *';

            const values = [patient.name, patient.birthday, patient.zipCode];

            return this.runner(sql, values).then((rows) => rows[0]);
        })
    }

    async attendanceRequest(attendanceRequest: AttendanceRequest) {
        attendanceRequest.validate();

        const { date, address } = attendanceRequest;

        return this.vaccinationAddresService.getAgenda(<any>date, <any>address)
        .then((vaccinationAddress: VaccinationAddressAgenda[]) => {
            if (vaccinationAddress.length === 0) {
                throw new Error('There is no available vaccination in this address at this day.');
            }

            return this.vaccinationAddresService.updateAppliedCountAgenda(<any>vaccinationAddress[0].id);
        });
    }

}

export default PatientService;