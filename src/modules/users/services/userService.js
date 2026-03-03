const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

class UserService {
    async getAll() {
        return await userModel.getAll();
    }

    async getById(id) {
        return await userModel.getById(id);
    }

    async getAllRoles() {
        return await userModel.getAllRoles();
    }

    async createUser({ login, password, role_id, email, steamid, balance }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await userModel.create(login, hashedPassword, role_id, email, steamid, balance);
    }

    async deleteUser(id) {
        return await userModel.removeById(id);
    }

    async updateUser(id, { login, password, role_id, email, steamid, balance }) {
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        return await userModel.editById(login, hashedPassword || undefined, role_id, id, email, steamid, balance);
    }

    async getCount() {
        return await userModel.getCount();
    }

    async getAdminCount() {
        return await userModel.getCountAdmin();
    }

    async getByLogin(login) {
        return await userModel.findByLogin(login)
    }
}
module.exports = new UserService()