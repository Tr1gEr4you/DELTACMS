const mysql = require('mysql2/promise')
const {host, user, password, database} = require('./settings');

const pool = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: database
})

async function getConnection() {
    return await pool.getConnection();
}

module.exports =  {
    getConnection
};