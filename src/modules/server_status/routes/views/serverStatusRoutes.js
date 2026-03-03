const express = require('express')
const router = express.Router()
const ServerStatusController = require('../../controllers/serverStatusController')

router.get('/', ServerStatusController.renderPage)

module.exports = router;