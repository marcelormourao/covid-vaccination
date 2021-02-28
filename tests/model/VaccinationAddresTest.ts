import { expect, assert } from 'chai';
import VaccinationAddress from '../../src/model/VaccinationAddress'

let address = new VaccinationAddress();

beforeEach(function() {
    address = new VaccinationAddress();
})

describe("VaccinationAddress validations", () => {
    it("VaccinationAddress name cannot be empty", () => {
        expect(() => address.validate()).to.throw('Name cannot be empty');
    });

    it("VaccinationAddress zipcode cannot be empty", () => {
        address.name = 'John Doe';
        expect(() => address.validate()).to.throw('Zipcode cannot be empty');
    });

    it("VaccinationAddress constructor", () => {
        address = new VaccinationAddress(1,"John Doe's House", '60000000')
        assert.equal(address.name, 'John Doe\'s House')
    });
})