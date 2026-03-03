const {getConnection} = require('../../../core/config/database')

class RconModel {
    async getServerByID(id) {
        const connection = await getConnection()
        try {
            const [rows] = await connection.query('SELECT * FROM servers WHERE id = ?', [id]);
            return rows[0];
        } catch (err) {
            console.log(err)
            return []
        } finally {
            if (connection) connection.release()
        }
    }
}

module.exports = new RconModel()