const express = require('express');
const router = express.Router();
const headerAdminController = require('../../controllers/headerAdminController');

router.get('/', headerAdminController.renderListPage);
router.get('/add', headerAdminController.renderAddPage);
router.get('/edit/:id', headerAdminController.renderEditPage);

router.post('/', headerAdminController.create);
router.put('/:id', headerAdminController.update);
router.delete('/:id', headerAdminController.delete);

module.exports = router;