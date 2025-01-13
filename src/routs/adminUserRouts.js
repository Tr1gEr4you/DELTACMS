const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/users/add', userController.showUserAddPage)
router.get('/users/delete', userController.showUserDeletePage)
router.post('/users/create', userController.create)
router.delete('/users/delete/:id', userController.removeById)

router.get('/users', userController.showUserEditPage);
router.get('/user/:id', userController.showUser)

module.exports = router;