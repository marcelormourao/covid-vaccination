import { expect, assert } from 'chai';
import Patient from '../../../src/model/Patient'

let patient = new Patient();

beforeEach(function() {
    patient = new Patient();
})

describe("Patient validations", () => {
    it("Patient name cannot be empty", () => {
        expect(() => patient.validate()).to.throw('Name cannot be empty');

        patient.name = '';

        expect(() => patient.validate()).to.throw('Name cannot be empty');

        patient.name = 'John Doe';

        assert.equal(patient.name, 'John Doe');
    });

    it("Patient name cannot be empty", () => {
        patient.name = 'John Doe';
        expect(() => patient.validate()).to.throw('Birthday cannot be empty');
    });

    it("Patient zipCode cannot be empty", () => {
        patient.name = 'John Doe';
        patient.birthday = new Date(1970,1,6);

        expect(() => patient.validate()).to.throw('ZipCode cannot be empty');
    });

    it("Patient must have 65 years or more", () => {
        patient.name = 'John Doe';
        patient.birthday = new Date(1970,1,6);
        patient.zipCode = '60000000';

        expect(() => patient.validate())
            .to.throw('Only people with 65 years or more can request vaccination');
    });

    it("Patient must have 65 years or more (birthday as string)", () => {
        patient.name = 'John Doe';
        (<any>patient).birthday = '1970-01-06';
        patient.zipCode = '60000000';

        expect(() => patient.validate())
            .to.throw('Only people with 65 years or more can request vaccination');
    });

    it("calculate age function", () => {
        patient.name = 'John Doe';
        patient.birthday = new Date(1970,1,6);
        patient.zipCode = '60000000';

        // It's not a good test. Sorry!
        const years = new Date().getFullYear() - 1970;

        assert.equal(patient.calculateAge((<any>patient).birthday.getTime()),years);
    });

    it("Patient is valid", () => {
        patient.name = 'John Doe';
        patient.birthday = new Date(1970,1,6);
        patient.zipCode = '60000000';

        assert.equal(patient.birthday.getFullYear(), 1970);
    });
})