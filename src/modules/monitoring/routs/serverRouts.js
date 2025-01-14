const express = require('express')
const router = express.Router()
const monitoringController = require('../controllers/serverController')

router.get('/servers', monitoringController.showMonitoringPage)

module.exports = router;