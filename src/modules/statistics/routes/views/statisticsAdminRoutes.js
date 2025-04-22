const express = require('express')
const router = express.Router()
const StatisticsAdminController = require('../../controllers/statisticsAdminController')

router.get('/', StatisticsAdminController.renderPage)

module.exports = router