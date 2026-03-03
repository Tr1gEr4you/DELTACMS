const { getConnection } = require('../../../core/config/database')
const RoleService = require('../services/roleService')

class RoleApiController {
    async create (req, res) {
        try {
            await RoleService.create(req.body);
            res.status(201).json({ message: 'Роль успешно создана' });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Ошибка при создании роли'})
        }
    }
    async delete (req, res) {
        try {
            await RoleService.delete(req.params.id)
            res.status(201).json({ message: 'Роль успешно удалена' });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Ошибка при удалении роли'})
        }
    }
    async update (req, res) {
        try {
            const role = await RoleService.getById(req.params.id)
            if (!role) {
                return res.status(404).json({ error: 'Роль не найдена' })
            }
            await RoleService.update(req.params.id, req.body)
            res.status(201).json({ message: 'Роль успешно обновлена' });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Ошибка при обновлении роли'})
        }
    }
}

module.exports = new RoleApiController()