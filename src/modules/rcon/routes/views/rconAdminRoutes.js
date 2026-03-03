const express = require('express');
const router = express.Router();
const RconAdminController = require('../../controllers/rconAdminController')

// Роут для отправки команды RCON
router.post('/:id', RconAdminController.sendCommand);
router.get('/:id', RconAdminController.renderPage)

module.exports = router;