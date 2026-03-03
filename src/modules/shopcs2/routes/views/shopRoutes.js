const express = require('express')
const router = express.Router()
const ShopController = require('../../controllers/shopController')

router.get('/stats', ShopController.renderPage)

module.exports = router;