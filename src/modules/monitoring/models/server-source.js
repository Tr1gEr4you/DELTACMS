const {getConnection} = require("../../../core/config/database");
const { GameDig } = require('gamedig');

module.exports = {
    create: async function (ip, port) {
        const connection = await getConnection();
        try {
            const [rows, fields] = await connection.query('INSERT INTO servers (ip, port) VALUES (?, ?)', [ip, port])
        } catch (err) {
            console.log(err);
            return [];      
        } finally {
            if (connection) connection.release();
        }
    },
    getAll: async function () {
        const connection = await getConnection();
        try {
            const [rows] = await connection.query(`SELECT * FROM servers`);
            return rows;
        } catch (err) {
            console.log(err);
            return [];
        } finally {
            if (connection) connection.release();
        }
    },
    getById: async function (id) {
        const connection = await getConnection();
        try {
            const [rows, fields] = await connection.query('SELECT * FROM servers Where id = ?', id)
            const server = rows[0];
            
            const serverInfo = await GameDig.query({
                type: 'counterstrike2',
                host: server.ip,
                port: server.port,
            });
            
            return serverInfo
        } catch (err) {
            console.log(err);
            return [];
        } finally {
            if (connection) connection.release();
        }
    },
    getCount: async function () {
        const connection = await getConnection();
        try {
            const [rows] = await connection.query('SELECT COUNT(*) FROM servers');
            const count = rows[0]['COUNT(*)']
            return count;
        } catch (error) {
            console.log(error)
        } finally {
            if (connection) connection.release();
        }
    },
}