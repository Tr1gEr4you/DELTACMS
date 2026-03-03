const express = require('express')
const router = express.Router()
const ShopAdminController = require('../../controllers/shopAdminController')

router.get('/settings', ShopAdminController.renderSettingsPage)
router.put('/settings', ShopAdminController.updateDatbaseConfig)

module.exports = router;