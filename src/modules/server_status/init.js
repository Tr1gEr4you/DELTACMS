const ServerStatusController = require('./controllers/serverStatusController')

// Автоматический запуск фонового обновления при подключении модуля
module.exports = async function () {
    await ServerStatusController.updateInBackground();
};