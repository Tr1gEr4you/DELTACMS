const UserService = require('../services/userService');

class UserAdminController {
    async renderListPage(req, res) {
        const users = await UserService.getAll();
        const userCount = await UserService.getCount();
        res.render('users/list', { users, userCount});
    }

    async renderAddPage(req, res) {
        res.render('users/add');
    }

    async renderEditPage(req, res) {
        const user = await UserService.getById(req.params.id);
        const roles = await UserService.getAllRoles()
        res.render('users/edit', { user, roles });
    }

    async create (req, res) {
        try {
            await UserService.createUser(req.body);
                res.redirect('/admin/users');
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка при создании пользователя' });
        }
     }
    
    async delete (req, res) {
        try {
            await UserService.deleteUser(req.params.id);
            res.redirect('/admin/users');
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка при удалении пользователя' });
        }
    }
    
    async update (req, res) {
        try {
            const userId = req.params.id;
            const userData = req.body;
        
            await UserService.updateUser(userId, userData);
        
            res.redirect('/admin/users');
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка при обновлении пользователя' });
        }
    }
}

module.exports = new UserAdminController()