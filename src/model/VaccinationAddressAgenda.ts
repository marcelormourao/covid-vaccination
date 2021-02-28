import VaccinationAddress from "./VaccinationAddress";

class VaccinationAddressAgenda {

    constructor(
        public id?: string,
        public address?: VaccinationAddress,
        public date?: Date,
        public capacity?: number,
        public applied?: number
    ){}

    validate() {
        if (!this.address) {
            throw new Error('Address cannot be empty');
        }

        if (!(this.address instanceof Object)) {
            throw new Error('Address should be an Object');
        }

        if (!this.address.id) {
            throw new Error('Address id is required');
        }

        if (!this.date || new Date() >= this.date) {
            throw new Error('Invalid date');
        }

        if (!this.capacity || this.capacity < 0) {
            throw new Error('Invalid capacity');
        }

        if (this.capacity > 100) {
            throw new Error('Capacity cannot be grater than 100 units');
        }
    }
}

export default VaccinationAddressAgenda