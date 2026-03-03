const { getConnection } = require('../config/database')

class GlobalSettingsService {
    async getCurrentTheme() {
        const connection = await getConnection();
        try {
            const [currentTheme] = await connection.query('SELECT value FROM settings WHERE setting_key = ?', ["theme"]);
            return currentTheme[0];
        } catch (err) {
            throw err; 
        } finally {
            if (connection) connection.release()
        }
    }
    async getAll() {
        const connection = await getConnection();
        try {
            const [settings] = await connection.query('SELECT * FROM settings');
            return settings.reduce((acc, setting) => {
                acc[setting.setting_key] = setting.value;
                return acc;
            }, {});
        } catch (err) {
            throw err; 
        } finally {
            if (connection) connection.release();
        }
    }

    async update(settings) {
        const connection = await getConnection();
        try {
            for (const key in settings) {
              await connection.query(
                'UPDATE settings SET value = ? WHERE setting_key = ?',
                [settings[key], key]
              );
            }
          } catch (err) {
            console.error(err);
          } finally {
            if (connection) connection.release();
          }
    }
}

module.exports = new GlobalSettingsService();