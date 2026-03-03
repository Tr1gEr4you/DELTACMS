const express = require('express');
const router = express.Router();
const ServerAdminController = require('../../controllers/serverAdminController');

// Страница со списком серверов
router.get('/', ServerAdminController.renderListPage);

// Страница для добавления нового сервера
router.get('/add', ServerAdminController.renderCreatePage);

// Страница для редактирования сервера
router.get('/edit/:id', ServerAdminController.renderEditPage);

// Создание нового сервера
router.post('/', ServerAdminController.create);

// Обновление сервера
router.put('/:id', ServerAdminController.update);

// Удаление сервера
router.delete('/:id', ServerAdminController.delete);

module.exports = router;