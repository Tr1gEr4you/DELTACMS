const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController');

router.get('/blogs', blogController.showBlogEditPage)
router.get('/blogs/add', blogController.showBlogAddPage)
router.post('/blogs/create', blogController.create)
router.delete('/blogs/delete/:id', blogController.removeById)

module.exports = router;