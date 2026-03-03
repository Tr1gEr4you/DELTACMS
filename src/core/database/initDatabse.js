const { getConnection } = require('../config/database.js')
const { log } = require('../utils/logger.js')
const bcrypt = require('bcrypt')

async function initializeDatabase() {
    const connection = await getConnection();
    try {
         // Создание таблицы настроек
         await connection.query(`
            CREATE TABLE IF NOT EXISTS settings (
                id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                setting_key VARCHAR(100) NOT NULL UNIQUE,
                value TEXT NULL
            )
        `);

        const [settings] = await connection.query(`SELECT COUNT(*) AS count FROM settings`);
        if (settings[0].count === 0) {
            await connection.query(`
                INSERT INTO settings (setting_key, value)
                VALUES 
                    ('theme', 'lounge'),
                    ('maintenance_mode', 'off'),
                    ('site_name', 'DeltaCMS')
                `);
        }

        // Создание таблицы ролей
        await connection.query(`
            CREATE TABLE IF NOT EXISTS roles (
                id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                name VARCHAR(100) NOT NULL,
                flags VARCHAR(30) NOT NULL
            )
        `);

        const [roles] = await connection.query(`SELECT COUNT(*) AS count FROM roles`);
        if (roles[0].count === 0) {
            await connection.query(`
                INSERT INTO roles (name, flags)
                VALUES 
                    ('user', 'u'),
                    ('admin', 'z')
            `);
        }

        // Создание таблицы пользователей
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                role_id INT,
                login VARCHAR(64) NOT NULL UNIQUE,
                email VARCHAR(322) NOT NULL,
                password VARCHAR(255) NOT NULL,
                steamID VARCHAR(100),
                balance INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (role_id) REFERENCES roles(id)
            )
        `);

        const [users] = await connection.query(`SELECT COUNT(*) AS count FROM users`);
        if (users[0].count === 0) {
            const hashedPassword = await bcrypt.hash('admin', 10);

            await connection.query(`
                INSERT INTO users (role_id, login, email, password)
                VALUES (?, ?, ?, ?)
            `, [2, 'admin', 'admin@admin.com', hashedPassword]);
        }

        // Создание таблицы модулей
        await connection.query(`
            CREATE TABLE IF NOT EXISTS modules (
                id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                moduleName VARCHAR(255) NOT NULL,
                route VARCHAR(255) NOT NULL,
                version VARCHAR(45),
                enabled BOOLEAN NOT NULL DEFAULT true,
                isCore BOOLEAN NOT NULL DEFAULT true
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS pages (
                id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                route VARCHAR(255) NOT NULL UNIQUE,
                content LONGTEXT,
                status ENUM('draft', 'published') DEFAULT 'draft',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) 
      ;`)
        
        await connection.query(`
            CREATE TABLE IF NOT EXISTS header_buttons (
                id INT AUTO_INCREMENT PRIMARY KEY,
                label VARCHAR(255) NOT NULL,
                url VARCHAR(255) NOT NULL,
                active BOOLEAN DEFAULT true,
                position INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ;`)

        await connection.query(`
            CREATE TABLE IF NOT EXISTS servers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                ip VARCHAR(45) NOT NULL,
                port INT NOT NULL,
                rcon_password VARCHAR(255) NOT NULL
            )
        ;`)

        await connection.query(`
            CREATE TABLE IF NOT EXISTS server_stats (
                id INT AUTO_INCREMENT PRIMARY KEY,
                server_id INT NOT NULL,
                player_count INT,
                map_name VARCHAR(128),
                status VARCHAR(50),
                last_updated DATETIME,
                FOREIGN KEY (server_id) REFERENCES servers(id)
            )
        ;`)

        await connection.query(`
            CREATE TABLE IF NOT EXISTS server_status_current (
                server_id INT PRIMARY KEY,
                name VARCHAR(500),
                player_count INT,
                max_players INT,
                status VARCHAR(50),
                last_updated DATETIME,
                FOREIGN KEY (server_id) REFERENCES servers(id)
            )
        ;`)

        await connection.query(`
            CREATE TABLE IF NOT EXISTS db_config (
                id INT AUTO_INCREMENT PRIMARY KEY,
                host VARCHAR(255) NOT NULL,
                user VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                \`database\` VARCHAR(255) NOT NULL,
                port INT,
                module_name VARCHAR(255) NOT NULL UNIQUE
            );`)

        log.info(`Database initialized.`)
    } catch (err) {
        log.error(`Error initializing database: ${err.message}`);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = { initializeDatabase }