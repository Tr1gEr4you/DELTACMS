const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')

router.get('/blogs', blogController.showBlogPage)
router.get('/blogs/other', blogController.showBlogPageOther)
router.get('/blogs/:id', blogController.getPostById)


module.exports = router;