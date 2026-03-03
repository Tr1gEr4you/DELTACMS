const ServerService = require('../services/serverService')

class ServerAdminController {
    async renderListPage(req, res) {
        try {
            const servers = await ServerService.getAll();
            res.render('servers/list', { servers });
        } catch (err) {
            console.log(err);
            res.status(500).send('Ошибка получения серверов');
        }
    }

    async renderCreatePage(req, res) {
        res.render('servers/add');
    }

    async renderEditPage(req, res) {
        const { id } = req.params;
        try {
            const server = await ServerService.getById(id);
            res.render('servers/edit', { server });
        } catch (err) {
            console.log(err);
            res.status(500).send('Ошибка получения сервера для редактирования');
        }
    }

    // Создание нового сервера
    async create(req, res) {
        const { ip, port, rcon_password } = req.body;
        try {
            await ServerService.create({ ip, port, rcon_password });
            res.redirect(`/admin/servers`);
        } catch (err) {
            console.log(err);
            res.status(500).send('Ошибка при создании сервера');
        }
    }

    // Обновление данных сервера
    async update(req, res) {
        const { id } = req.params;
        const { ip, port, rcon_password } = req.body;
        try {
            await ServerService.update(id, { ip, port, rcon_password });
            res.redirect(`/admin/servers`);
        } catch (err) {
            console.log(err);
            res.status(500).send('Ошибка при обновлении сервера');
        }
    }

    // Удаление сервера
    async delete(req, res) {
        const { id } = req.params;
        try {
            await ServerService.delete(id);
            res.redirect('/admin/servers');
        } catch (err) {
            console.log(err);
            res.status(500).send('Ошибка при удалении сервера');
        }
    }
}

module.exports = new ServerAdminController();