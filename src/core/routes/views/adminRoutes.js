const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/adminController');
const GlobalSettingsController = require('../../controllers/GlobalSettingsController')

router.get('/', adminController.renderMainPage);
router.get('/login', adminController.renderLoginPage)
router.get('/dashboard', adminController.renderDashboardPage)
router.get('/settings', GlobalSettingsController.renderSettingsPage);

module.exports = router;