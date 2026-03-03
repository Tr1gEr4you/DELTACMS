const ServerModel = require('../models/serverModel');

class ServerService {
    async getAll() {
        return await ServerModel.getAll();
    }

    async getById(id) {
        if (!id) throw new Error('ID сервера обязателен');
        return await ServerModel.getById(id);
    }

    // Создать новый сервер
    async create({ ip, port, rcon_password }) {
        if (!ip || !port || !rcon_password) {
            throw new Error('IP, порт и RCON пароль обязательны');
        }
        return await ServerModel.create({ ip, port, rcon_password });
    }

    // Обновить сервер
    async update(id, { ip, port, rcon_password }) {
        if (!id) throw new Error('ID сервера обязателен');
        const existingServer = await ServerModel.getById(id);
        if (!existingServer) throw new Error('Сервер не найден');

        return await ServerModel.update(id, { ip, port, rcon_password });
    }

    // Удалить сервер
    async delete(id) {
        if (!id) throw new Error('ID сервера обязателен');
        const existingServer = await ServerModel.getById(id);
        if (!existingServer) throw new Error('Сервер не найден');

        return await ServerModel.delete(id);
    }
}

module.exports = new ServerService();