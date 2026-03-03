const userModel = require('../../users/models/userModel');
const UserService = require('../../users/services/userService')
const bcrypt = require('bcrypt')

class AuthService {
    async authenticate(login, password) {
        const user = await userModel.findByLogin(login);
        if (!user) throw new Error('User not found');

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new Error('Invalid password');
        
        return {
            id: user.id,
            login: user.login,
            email: user.email,
            role_name: user.role_name,
            role_flags: user.role_flags
        };
    }
    async register({login, password, email,}) {
        const existing = await UserService.getByLogin(login)

        if (existing) {
            throw new Error('Пользователь с таким логином или email уже существует')
        }

        await UserService.createUser({login, password, role_id: 2, email, steamid: 0, balance: 0})
    }
}

module.exports = new AuthService()