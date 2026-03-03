const express = require('express')
const router = express.Router()
const ServerStatusAdminController = require('../../controllers/serverStatusAdminController')

router.get('/:id', ServerStatusAdminController.renderStatsPage)

module.exports = router;