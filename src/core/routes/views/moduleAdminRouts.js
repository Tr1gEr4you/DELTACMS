const express = require('express')
const router = express.Router();
const moduleController = require('../../controllers/moduleController')
const multer = require('multer');

const upload = multer({ dest: '../uploads/modules/'})

router.put('/enabled/:id', moduleController.enabled);
router.put('/disabled/:id',moduleController.disabled);
router.post('/upload', upload.single('module'), moduleController.upload)
router.get('/', moduleController.renderModulesPage)

module.exports = router;