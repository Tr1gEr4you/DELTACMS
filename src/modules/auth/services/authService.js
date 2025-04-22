const userModel = require('../../users/models/userModel');
const bcrypt = require('bcrypt')

class AuthService {
    async authenticate(login, password) {
        const user = await userModel.findByLogin(login);
        if (!user) throw new Error('User not found');

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new Error('Invalid password');
    
        return user;
    }
}

module.exports = new AuthService()