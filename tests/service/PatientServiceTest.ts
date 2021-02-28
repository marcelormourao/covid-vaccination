import { expect, assert } from 'chai';
import Patient from '../../src/model/Patient';
import PatientService from '../../src/service/PatientService'

const runner = (sql: string, values?: any[]): Promise<any[]> => {
    return new Promise((resolve) => {
        return resolve([
            new Patient(1, 'John Doe', new Date('1950-01-06'), '60165121')
        ]);
    });
}

let service = new PatientService(runner);

describe("PatientService", () => {
    it("should save Patient with valid cep", async () => {
        const patient = 
        new Patient(undefined, 'John Doe', new Date('1950-01-06'), '60165121');

        const savedPatient = await service.save(patient);

        assert.exists(savedPatient.id);

        assert.equal(savedPatient.id, 1);
    });

    it("should not save Patient with invalid cep", async () => {
        const patient = 
        new Patient(undefined, 'John Doe', new Date('1950-01-06'), '66999999');

        try {
            await service.save(patient);
        } catch (error) {
            assert.equal(error.message, 'Todos os serviços de CEP retornaram erro.');
        }
    });
})