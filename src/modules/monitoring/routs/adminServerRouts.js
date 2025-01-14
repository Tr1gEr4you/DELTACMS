const express = require('express')
const router = express.Router()
const serverController = require('../controllers/serverController')

router.get('/servers', serverController.showServerEditPage)
router.get('/servers/add', serverController.showServerAddPage)
router.post('/servers/create', serverController.create)

module.exports = router;