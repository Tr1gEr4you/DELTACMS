const express = require('express')
const router = express.Router()
const userAdminController = require('../../controllers/userAdminController')
const { checkRole } = require('../../../../core/middlewares/checkRoles')

router.get('/', userAdminController.renderListPage)
router.get('/add', userAdminController.renderAddPage)
router.get('/edit/:id', userAdminController.renderEditPage)

router.post('/', userAdminController.create)
router.delete('/:id', userAdminController.delete)
router.put('/:id', userAdminController.update)

module.exports = router;