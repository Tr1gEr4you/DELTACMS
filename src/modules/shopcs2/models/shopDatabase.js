const mysql = require('mysql2/promise');
const { getConnection } = require('../../../core/config/database');

let shopPool = null;

async function getShopConnection() {
    try {
        await initializeShopPool();
        return await shopPool.getConnection();
    } catch (err) {
        console.log('Ошибка подключения к shop-базе:', err);
    }
}

async function initializeShopPool() {
    const connection = await getConnection();
    try {
        const [config] = await connection.query(
            'SELECT * FROM db_config WHERE module_name = ? LIMIT 1',
            ['shop']
        );
        connection.release();
        
        // Пересоздаём пул с актуальными данными
        shopPool = mysql.createPool({
            host: config[0].host,
            user: config[0].user,
            password: config[0].password,
            database: config[0].database,
            port: config[0].port || 3306,
        });
    } catch (err) {
        console.log('Ошибка при инициализации пула соединений с базой данных:', err);
    }
}

module.exports = { getShopConnection };