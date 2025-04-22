const HeaderService = require('../../modules/header/services/headerService');

async function loadButtons(req, res, next) {
    try {
        const buttons = await HeaderService.getActiveButtons(); // предположим, там фильтруются активные
        res.locals.headerButtons = buttons;
        next();
    } catch (err) {
        console.error('Ошибка при загрузке кнопок хедера:', err);
        res.locals.headerButtons = [];
        next();
    }
}

module.exports = {
    loadButtons
}