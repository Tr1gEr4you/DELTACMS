const express = require('express')
const router = express.Router();
const GlobalSettingsController = require('../../controllers/GlobalSettingsController')

router.put('/settings', GlobalSettingsController.update)

module.exports = router; 