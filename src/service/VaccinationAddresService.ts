import VaccinationAddress  from '../model/VaccinationAddress'
import VaccinationAddressAgenda  from '../model/VaccinationAddressAgenda'
import { run } from './DatabaseHelper'
const cep = require('cep-promise')
import Address from '../model/Address'

class VaccinationAddressService {

    constructor(
        private runner: (sql: string, params?: any[]) => Promise<any[]> = run
    ) {
    }

    async list(): Promise<VaccinationAddress[]> {

        const sql: string = 'SELECT * FROM tb_vaccination_address';
        
        return this.runner(sql).then((rows) => rows);
    }

    async save(local: VaccinationAddress): Promise<VaccinationAddress> {
        local.validate();

        return await cep(local.zipcode)
        .then((address: Address) => {
            // console.log(address);

            const sql: string = 'INSERT INTO tb_vaccination_address (name,zipcode) VALUES ($1, $2) RETURNING *';
        
            const values = [local.name, local.zipcode];
            
            return this.runner(sql, values).then((rows) => rows[0]);
        });
    }

    async delete(id: number): Promise<VaccinationAddress> {

        const sql: string = 'DELETE from tb_vaccination_address where id = $1';
        
        const values = [id];
        
        return this.runner(sql, values).then((rows) => rows[0]);
    }

    async saveAgenda(agenda: VaccinationAddressAgenda): Promise<VaccinationAddressAgenda> {
        agenda.validate();

        const sql: string = 'INSERT INTO tb_vaccination_address_agenda (date,id_vaccination_address, capacity) VALUES ($1, $2, $3) RETURNING *';
        
        const values = [agenda.date, (<any>agenda.address).id, agenda.capacity];
        
        return this.runner(sql, values).then((rows) => rows[0]);
    }

    async getAgenda(date: string, address: number): Promise<VaccinationAddressAgenda[]> {
        this.validateGetAgendaFilters(date, address);

        const sql: string = 'SELECT * from tb_vaccination_address_agenda WHERE date = $1 AND id_vaccination_address = $2';
        
        const values = [date, address];
        
        return this.runner(sql, values).then((rows) => rows.map(row => { 
            row.address = {"id": row.id_vaccination_address}
            row.available = row.capacity - row.applied;
            delete row.id_vaccination_address;
            return row; 
        })
        .filter((row : VaccinationAddressAgenda) => <any>row.applied < <any>row.capacity));
    }

    validateGetAgendaFilters(date: string, address: number) {
        if (!date) {
            throw new Error('Date is required');
        }

        if (!address) {
            throw new Error('Address is required');
        }
    }

    updateAppliedCountAgenda(agendaId: number) {
        const sql: string = 'UPDATE tb_vaccination_address_agenda SET applied = applied + 1 where id = $1';
        
        const values = [agendaId];
        
        return this.runner(sql, values);
    }
}

export default VaccinationAddressService;