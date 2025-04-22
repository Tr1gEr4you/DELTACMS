const express = require('express')
const router = express.Router()
const serverController = require('../controllers/serverController')

router.get('/', serverController.showServerEditPage)
router.get('/add', serverController.showServerAddPage)
router.post('/create', serverController.create)

module.exports = router;