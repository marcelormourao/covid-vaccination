const { Client } = require('pg')

const run = async (sql: string, params?: any[]): Promise<any[]> => {
    const client = new Client();
    
    await client.connect();

    const res = await client.query(sql, params);

    await client.end();
    
    return res.rows;
}

export { run };