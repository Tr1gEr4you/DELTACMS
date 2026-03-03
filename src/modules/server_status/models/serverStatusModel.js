const {getConnection} = require("../../../core/config/database");
const { GameDig } = require('gamedig');

class ServerStatus {
    async update (serverId, name, mapName, playerCount, maxPlayers, serverStatus) {
        const connection = await getConnection();
        try {
            const [result] = await connection.query(`INSERT INTO server_status_current (server_id, name, player_count, max_players, status, last_updated)
            VALUES (?, ?, ?, ?, ?, NOW())
            ON DUPLICATE KEY UPDATE 
                name = VALUES(name),
                player_count = VALUES(player_count),
                max_players = VALUES(max_players),
                status = VALUES(status),
                last_updated = NOW();
            `, [serverId, name, playerCount, maxPlayers, serverStatus])

            await connection.query(`
                INSERT INTO server_stats (server_id, player_count, map_name, status, last_updated)
                VALUES (?, ?, ?, ?, NOW());
            `, [serverId, playerCount, mapName, serverStatus]);

            /*await connection.query(`
                DELETE FROM server_stats 
                WHERE last_updated < NOW() - INTERVAL 30 DAY;
              `);*/

            return result;
        } catch (err) {
            console.log(err)
        } finally {
            if (connection) connection.release()
        }
    }

    async updateStatusOnly(server_id, status) {
        const connection = await getConnection();
        try {
            await connection.query(`UPDATE server_status_current SET status = ? WHERE server_id = ?`, [status, server_id])

            await connection.query(`
                INSERT INTO server_stats (server_id, player_count, map_name, status, last_updated)
                VALUES (?, ?, ?, ?, NOW());
            `, [server_id, 0, null, status]);
        } catch (err) {
            console.log(err)
        } finally {
            if (connection) connection.release()
        }
    }

    async getAllCurrent () {
        const connection = await getConnection();
        try {
            const [result] = await connection.query(`SELECT s.ip, s.port, ss.name, ss.player_count, ss.max_players, ss.status, ss.last_updated
            FROM server_status_current ss
            JOIN servers s ON ss.server_id = s.id`)
            return result
        } catch (err) {
            console.log(err)
        } finally {
            if (connection) connection.release()
        }
    }

    async getAll (serverId, startDate, endDate) {
        const connection = await getConnection();
        try {
            const [result] = await connection.query(`
                SELECT player_count, last_updated, map_name, status
                FROM server_stats
                WHERE server_id = ? AND last_updated BETWEEN ? AND ?
                ORDER BY last_updated ASC
            `, [serverId, startDate, endDate]);
            console.log(result)
            return result;
        } catch (err) {
            console.log(err)
        } finally {
            if (connection) connection.release()
        }
    }
}   

module.exports = new ServerStatus()