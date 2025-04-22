const express = require('express');
const router = express.Router();
const PageController = require('../../controllers/pageController')

router.get('*', PageController.renderPage)

module.exports = router;