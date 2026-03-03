const express = require('express')
const router = express.Router()
const roleAdminController = require('../../controllers/roleAdminController')

router.get('/', roleAdminController.renderListPage)
router.get('/add', roleAdminController.renderAddPage)
router.get('/edit/:id', roleAdminController.renderEditPage)

router.post('/', roleAdminController.create)
router.delete('/:id', roleAdminController.delete)
router.put('/:id', roleAdminController.update)

module.exports = router