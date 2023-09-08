import knex from 'knex';
const db = knex({
    client:'mysql',
    connection:{
        host:'localhost',
        user:'root',
        password:'Enter database password here',
        database:'Enter database name here'
    }
})
export default db;
