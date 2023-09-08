import knex from 'knex';
const db = knex({
    client:'mysql',
    connection:{
        host:'localhost',
        user:'root',
        password:'Purposedatabase',
        database:'codersden'
    }
})
export default db;