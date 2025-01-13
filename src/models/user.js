const {getConnection} = require("../database");

module.exports = {
    getAll: async function () {
        const connection = await getConnection();
        try {
            const [rows, fields] = await connection.query(`SELECT * FROM users`)
            const users = rows;
            return users;
        } catch (err) {
            console.log(err)
            return [];
        } finally {
            if (connection) connection.release();
        }
    },
    getById: async function (id) {
        const connection = await getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM users Where id = ?', id)
            const user = rows[0]
            return user;
        } catch (err) {
            console.log(err)
            return [];
        } finally {
            if (connection) connection.release();
        }
    },
    getCount: async function () {
        const connection = await getConnection();
        try {
            const [rows] = await connection.query('SELECT COUNT(*) FROM users');
            const count = rows[0]['COUNT(*)']
            return count;
        } catch (error) {
            console.log(error)
        } finally {
            if (connection) connection.release();
        }
    },
    getCountAdmin: async function () {
        const connection = await getConnection();
        try {
            const [rows] = await connection.query('SELECT COUNT(*) FROM users Where flags = ?', 'a');
            const count = rows[0]['COUNT(*)']
            return count;
        } catch (error) {
            console.log(error)
        } finally {
            if (connection) connection.release();
        }
    },
    removeById: async function (id) {
        const connection = await getConnection();
        try {
            const [user] = await connection.query('DELETE FROM users Where id = ?', id)
        } catch (err) {
            console.log(err)
        } finally {
            if (connection) connection.release();
        }
    },
    create: async function (login, password, flags) {
        const connection = await getConnection();
        try {
            await connection.query('INSERT INTO users (login, password, flags) VALUES (?, ?, ?)', [login, password, flags])
        } catch (err) {
            console.log(err)
        } finally {
            if (connection) connection.release();
        }
    },
    findByLogin: async function (login, password) {
        const connection = await getConnection();
        try {
            const [rows, fields] = await connection.query('SELECT * FROM users WHERE login')
            const user = rows;
            return user;
        } catch (err) {
            console.log(err) 
        } finally {
            if (connection) connection.release();
        }
    }
}