const express = require('express')
const router = express.Router()
const AuthPageController = require('../../controllers/authPageController')

router.get('/', AuthPageController.renderloginPage)

module.exports = router