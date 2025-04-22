const RoleService = require('../services/roleService')

class RoleAdminController {
    async renderListPage (req, res) {
        const roles = await RoleService.getAll()
        res.render('roles/list', {roles})
    }
    async renderAddPage (req, res) {
        res.render('roles/add')
    }
    async renderEditPage (req, res) {
        const role = await RoleService.getById(req.params.id)
        res.render('roles/edit', {role})
    }
    async create (req, res) {
        try {
            await RoleService.create(req.body);
            res.redirect('/admin/roles')
        } catch (err) {
            console.log(err)
        }
    }
    async delete (req, res) {
        try {
            await RoleService.delete(req.params.id)
            res.redirect('/admin/roles')
        } catch (err) {
            console.log(err)
        }
    }
    async update (req, res) {
        try {
            const role = await RoleService.getById(req.params.id)
            if (!role) {
                console.log(error + ' Роль не найден')
            }
            await RoleService.update(req.params.id, req.body)
            res.redirect('/admin/roles')
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new RoleAdminController()