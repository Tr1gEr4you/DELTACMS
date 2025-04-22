const SettingsService = require('../services/GlobalSettingsService')

async function settingsLoader(req, res, next) {
    try {
        const settings = await SettingsService.getAll()
        res.locals.settings = settings;
        next();
    } catch (err) {
        console.error('Ошибка при загрузке кнопок хедера:', err);
        res.locals.headerButtons = [];
        next();
    }
}

module.exports = {
    settingsLoader
}