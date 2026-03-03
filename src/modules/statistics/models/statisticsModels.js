const { getConnection } = require('../../../core/config/database')

class StatisticsModel {
    async getCountUsers () {
        const connection = await getConnection()
        try {
            const [rows] = await connection.query(`SELECT COUNT(*) AS count FROM users`)
            return rows[0].count;
        } catch (err) {
            console.log(err)
        } finally {
            if (connection) connection.release()
        }
    }
    async getLatestUsers (limit = 10) {
        const connection = await getConnection()
        try {
            const [rows] = await connection.query(`
                SELECT id, login, email, created_at
                FROM users
                ORDER BY created_at DESC
                LIMIT ?
            `, [limit])
            return rows;
        } catch (err) {
            console.log(err)
        } finally {
            if (connection) connection.release()
        }
    }

    async getRegistrationByDay (days = 7) {
        const connection = await getConnection()
        try {
            const [rows] = await connection.query(`
                SELECT DATE(created_at) AS date, COUNT(*) AS count
                FROM users
                WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
                GROUP BY DATE(created_at)
                ORDER BY date DESC
              `, [days]);
            return rows;
        } catch (err) {
            console.log(err)
        } finally {
            if (connection) connection.release()
        }
    }
}

module.exports = new StatisticsModel()