const express = require('express')
const router = express.Router()
const AuthController = require('../../controllers/authController')

router.get('/login', AuthController.renderloginPage)
router.get('/logout', AuthController.logout)
router.get('/register', AuthController.renderRegPage)
router.post('/login', AuthController.login)
router.post('/register', AuthController.register)

module.exports = router