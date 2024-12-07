const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const adminController = require('../controllers/adminController')

router.get('/', adminController.showMainPage);
router.get('/user', adminController.showUserEditPage);
router.get('/user/:id', adminController.showUser)
router.delete('/user/:id', userController.removeById)

module.exports = router;