const { getConnection } = require('../../../core/config/database')

class RoleModel {
    async getAll () {
        const connection = await getConnection()
        try {
            const [rows] = await connection.query(`SELECT * FROM roles`)
            return rows;
        } catch (err) {
            console.log(err)
            return [];
        } finally {
            if (connection) connection.release()
        }
    }

    async getById(id) {
        const connection = await getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM roles WHERE id = ?', [id]);
            return rows[0];
        } catch (err) {
            console.log(err);
            return null;
        } finally {
            if (connection) connection.release();
        }
    }

    async create (name, flags) {
        const connection = await getConnection()
        try {
            await connection.query(`INSERT INTO roles (name, flags) VALUES (?, ?)`, [name, flags])
        } catch (err) {
            console.log(err)
        } finally {
            if (connection) connection.release()
        }
    }

    async delete (id) {
        const connection = await getConnection()
        try {
            await connection.query(`DELETE FROM roles WHERE id = ?`, [id])
        } catch (err) {
            console.log(err)
        } finally {
            if (connection) connection.release()
        }
    }

    async update (id, name, flags) {
        const connection = await getConnection()
        try {
            await connection.query(`UPDATE roles SET name = ?, flags = ? WHERE id = ?`, [name, flags, id])
        } catch (err) {
            console.log(err)
        } finally {
            if (connection) connection.release()
        }
    }
}

module.exports = new RoleModel()