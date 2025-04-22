const express = require('express')
const router = express.Router()
const monitoringController = require('../controllers/serverController')

router.get('/', monitoringController.renderPage)

module.exports = router;