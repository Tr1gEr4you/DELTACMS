const express = require('express')
const router = express.Router()
const mainController = require('../controllers/mainController')

router.get('/', mainController.showMainPage);
//router.get('/:page', mainController.showPage);

module.exports = router;