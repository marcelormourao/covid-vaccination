class VaccinationAddress {

    constructor(
        public id? : number,
        public name?: string,
        public zipcode?: string
    ){}

    validate() {
        if (!this.name || this.name === '') {
            throw new Error('Name cannot be empty');
        }

        if (!this.zipcode || this.zipcode === '') {
            throw new Error('Zipcode cannot be empty');
        }
    }
}

export default VaccinationAddress