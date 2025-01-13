const {getConnection} = require("../database");

module.exports = {
    getAll: async function () {
        const connection = await getConnection();
        try {
            const [rows, fields] = await connection.query(`SELECT * FROM blogs`)
            const blogs = rows;
            return blogs;
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
            const [rows] = await connection.query('SELECT * FROM blogs Where id = ?', id)
            const blog = rows[0]
            return blog;
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
            const [rows] = await connection.query('SELECT COUNT(*) FROM blogs');
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
            const [blog] = await connection.query('DELETE FROM blogs Where id = ?', id)
        } catch (err) {
            console.log(err)
        } finally {
            if (connection) connection.release();
        }
    },
    create: async function (title, description, image, shortDescription) {
        const connection = await getConnection();
        try {
            await connection.query('INSERT INTO blogs (title, description, image, shortDescription) VALUES (?, ?, ?, ?)', [title, description, image, shortDescription])
        } catch (err) {
            console.log(err)
        } finally {
            if (connection) connection.release();
        }
    }
}