const userService = require('../services/userService');

class UserController {
    async getAll(req, res) {
        try {
            const users = await userService.getAll(); // вызов метода
            res.json(users); // отправка результата клиенту
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка при получении пользователей' });
        }
    }
}

module.exports = new UserController();