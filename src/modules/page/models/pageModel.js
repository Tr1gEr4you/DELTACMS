const { getConnection } = require("../../../core/config/database");

class PageModel {
    async getAll() {
        const connection = await getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM pages ORDER BY created_at DESC');
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
            const [rows] = await connection.query('SELECT * FROM pages WHERE id = ?', [id]);
            return rows[0] || null;
        } catch (err) {
            console.log(err);
            return null;
        } finally {
            if (connection) connection.release();
        }
    }

    async getByRoute(route) {
        const connection = await getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM pages WHERE route = ?', [route]);
            return rows[0] || null;
        } catch (err) {
            console.log(err);
            return null;
        } finally {
            if (connection) connection.release();
        }
    }

    async create({ title, route, content, status }) {
        const connection = await getConnection();
        try {
            await connection.query(
                'INSERT INTO pages (title, route, content, status) VALUES (?, ?, ?, ?)',
                [title, route, content, status]
            );
        } catch (err) {
            console.log(err);
        } finally {
            if (connection) connection.release();
        }
    }

    async update(id, { title, route, content, status }) {
        const connection = await getConnection();
        try {
            await connection.query(
                'UPDATE pages SET title = ?, route = ?, content = ?, status = ? WHERE id = ?',
                [title, route, content, status, id]
            );
        } catch (err) {
            console.log(err);
        } finally {
            if (connection) connection.release();
        }
    }

    async delete(id) {
        const connection = await getConnection();
        try {
            await connection.query('DELETE FROM pages WHERE id = ?', [id]);
        } catch (err) {
            console.log(err);
        } finally {
            if (connection) connection.release();
        }
    }

    async getCount() {
        const connection = await getConnection();
        try {
            const [rows] = await connection.query('SELECT COUNT(*) AS count FROM pages');
            return rows[0].count;
        } catch (err) {
            console.log(err);
            return 0;
        } finally {
            if (connection) connection.release();
        }
    }
}

module.exports = new PageModel();