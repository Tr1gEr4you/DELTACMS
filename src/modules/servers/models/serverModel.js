const { getConnection } = require('../../../core/config/database');

class ServerModel {
    async getAll() {
        const connection = await getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM servers');
            return rows;
        } finally {
            if (connection) connection.release();
        }
    }

    async getById(id) {
        const connection = await getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM servers WHERE id = ?', [id]);
            return rows[0];
        } finally {
            if (connection) connection.release();
        }
    }

    async create({ ip, port, rcon_password }) {
        const connection = await getConnection();
        try {
            const [result] = await connection.query(
                'INSERT INTO servers (ip, port, rcon_password) VALUES (?, ?, ?)',
                [ip, port, rcon_password]
            );
        } finally {
            if (connection) connection.release();
        }
    }

    async update(id, { ip, port, rcon_password }) {
        const connection = await getConnection();
        try {
            await connection.query(
                'UPDATE servers SET ip = ?, port = ?, rcon_password = ? WHERE id = ?',
                [ip, port, rcon_password, id]
            );
        } finally {
            if (connection) connection.release();
        }
    }

    async delete(id) {
        const connection = await getConnection();
        try {
            await connection.query('DELETE FROM servers WHERE id = ?', [id]);
        } finally {
            if (connection) connection.release();
        }
    }
}

module.exports = new ServerModel();