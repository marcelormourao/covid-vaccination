export default class AttendanceRequest {

    constructor(
        public date?: Date,
        public address?: number
    ){}

    validate() {
        if (!this.date) {
            throw new Error('Date is required');
        }

        if (!this.address) {
            throw new Error('Address is required');
        }
    }
}