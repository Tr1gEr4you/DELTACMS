const express = require('express');
const router = express.Router();
const PageAdminController = require('../../controllers/pageAdminController')

router.get('/', PageAdminController.renderListPage);
router.get('/add', PageAdminController.renderAddPage);
router.get('/edit/:id', PageAdminController.renderEditPage);

router.post('/', PageAdminController.create);
router.put('/:id', PageAdminController.update);
router.delete('/:id', PageAdminController.delete);

module.exports = router;