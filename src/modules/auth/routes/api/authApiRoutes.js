const express = require('express')
const router = express.Router()
const AuthApiController = require('../../controllers/authApiController')

router.post('/login', AuthApiController.login)
router.get('/logout', AuthApiController.logout)

module.exports = router