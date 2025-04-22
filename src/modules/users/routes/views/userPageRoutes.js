const express = require('express')
const router = express.Router()
const UserPageController = require('../../controllers/userPageController')
const { authenticateUser } = require('../../../../core/middlewares/auth')

router.get('/profile', authenticateUser(), UserPageController.renderProfilePage)
router.get('/settings', authenticateUser(), UserPageController.renderSettingsPage)

module.exports = router;