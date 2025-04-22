const authSerivce = require('../services/authService');

class AuthController {
    async login(req, res) {
        try {
            const { login, password } = req.body;
            const user = await authSerivce.authenticate(login, password);

            req.session.userID = user.id;
            req.session.userFlags = user.role_flags;
            req.session.userBalance = user.balance;
            req.session.userLogin = user.login;

            res.redirect('/users/profile');
        } catch (err) {
            res.status(400).json({ error: 'Ошибка при авторизации' });
            console.log(err)
        }
    }
    
    async logout(req, res) {
        req.session.destroy(err => {
            if (err) return res.status(500).send('Could not log out');
            res.redirect('/');
        });
    }
}

module.exports = new AuthController()