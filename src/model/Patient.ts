class Patient {

    constructor(
        public id? : number,
        public name?: string,
        public birthday?: Date,
        public zipCode?: string
    ){}

    calculateAge(birthday: number) {
        var ageDifMs = Date.now() - birthday;
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    validate() {
        if (!this.name || this.name === '') {
            throw new Error('Name cannot be empty');
        }

        if (!this.birthday) {
            throw new Error('Birthday cannot be empty');
        }

        if (!this.zipCode) {
            throw new Error('ZipCode cannot be empty');
        }
    
        if (this.calculateAge(new Date(this.birthday).getTime()) < 65) {
            throw new Error('Only people with 65 years or more can request vaccination');
        }
    }
}

export default Patient;