const { getConnection } = require("../../../core/config/database");
const bcrypt = require('bcrypt');

class User {
    async getAll() {
        const connection = await getConnection();
        try {
            const [rows] = await connection.query(`
                SELECT 
                    users.*, 
                    roles.name AS role_name, 
                    roles.flags AS role_flags
                FROM users
                LEFT JOIN roles ON users.role_id = roles.id
            `);
            return rows;
        } catch (err) {
            console.log(err);
            return [];
        } finally {
            if (connection) connection.release();
        }
    }

    async getById(id) {
        const connection = await getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
            return rows[0];
        } catch (err) {
            console.log(err);
            return null;
        } finally {
            if (connection) connection.release();
        }
    }

    async getCount() {
        const connection = await getConnection();
        try {
            const [rows] = await connection.query('SELECT COUNT(*) FROM users');
            return rows[0]['COUNT(*)'];
        } catch (err) {
            console.log(err);
            return 0;
        } finally {
            if (connection) connection.release();
        }
    }

    async removeById(id) {
        const connection = await getConnection();
        try {
            await connection.query('DELETE FROM users WHERE id = ?', [id]);
        } catch (err) {
            console.log(err);
        } finally {
            if (connection) connection.release();
        }
    }

    async create(login, hashedPassword, role_id, email, steamid, balance) {
        const connection = await getConnection();
        try {
            await connection.query('INSERT INTO users (login, password, role_id, email, steamid, balance) VALUES (?, ?, ?, ?, ?, ?)', [login, hashedPassword, role_id, email, steamid, balance]);
        } catch (err) {
            console.log(err);
        } finally {
            if (connection) connection.release();
        }
    }

    async findByLogin(login) {
        const connection = await getConnection();
        try {
            const [rows] = await connection.query(`
                SELECT 
                    users.id,
                    users.login,
                    users.email,
                    users.password,
                    users.steamID,
                    users.balance,
                    users.created_at,
                    users.updated_at,
                    roles.name AS role_name,
                    roles.flags AS role_flags
                FROM users
                LEFT JOIN roles ON users.role_id = roles.id
                WHERE users.login = ?
            `, [login]);
            return rows[0];
        } catch (err) {
            console.log(err);
            return null;
        } finally {
            if (connection) connection.release();
        }
    }

    async editById(login, password, role_id, id, email, steamid, balance) {
        const connection = await getConnection();
        try {
            await connection.query('UPDATE users SET login = ?, password = ?, role_id = ?, email = ?, steamid = ?, balance = ? WHERE id = ?', [login, password, role_id, email, steamid, balance, id]);
        } catch (err) {
            console.log(err);
        } finally {
            if (connection) connection.release();
        }
    }

    async getAllRoles() {
        const connection = await getConnection();
        try {
            const [rows] = await connection.query('SELECT id, name FROM roles');
            return rows;
        } finally {
            if (connection) connection.release();
        }
    }
}

module.exports = new User();