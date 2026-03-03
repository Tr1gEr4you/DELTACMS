const { getConnection } = require('../../../core/config/database')
const { getShopConnection } = require('./shopDatabase');

class ShopModel {
    async getAll() {
        const connection = await getShopConnection()
        try {
            const [rows] = await connection.query(`SELECT * FROM shop_players`)
            return rows;
        } catch (err) {
            console.log(err)
        } finally {
            if (connection) connection.release()
        }
    }
    async getSettings() {
        const connection = await getConnection()
        try {
            const [rows] = await connection.query(`SELECT * FROM db_config WHERE module_name = ?`, ['shop'])
            return rows[0]
        } catch (err) {
            console.log(err)
        } finally {
            if (connection) connection.release()
        }
    }

    async updateDatbaseConfig({host, user, password, database, port}) {
        const connection = await getConnection()
        try {
            const module_name = "shop"
            await connection.query(`
                INSERT INTO db_config (host, user, password, \`database\`, port, module_name)
                VALUES (?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE 
                    host = VALUES(host), 
                    user = VALUES(user), 
                    password = VALUES(password), 
                    \`database\` = VALUES(\`database\`), 
                    port = VALUES(port)
            `, [host, user, password, database, port, module_name]);
        } catch (err) {
            console.log(err)
        } finally {
            if (connection) connection.release()
        }
    }
}

module.exports = new ShopModel()