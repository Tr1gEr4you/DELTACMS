const express = require('express')
const router = express.Router()
const mainController = require('../controllers/mainController')
const blogController = require('../controllers/blogController')
const userController = require('../controllers/userController')

router.get('/', mainController.showMainPage);
router.get('/servers', mainController.showMonitoringPage)
router.get('/blogs', blogController.showBlogPage)
router.get('/blogs/other', blogController.showBlogPageOther)
router.get('/blogs/:id', blogController.getPostById)

router.post('/login', userController.findByLogin)

module.exports = router;