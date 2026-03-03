const AuthService = require('../services/authService');

class AuthController {
    async login(req, res) {
        try {
            const { login, password } = req.body;
            const user = await AuthService.authenticate(login, password);

            req.session.user = user;

            res.redirect('/users/profile');
        } catch (err) {
            console.log(err)
        }
    }
    
    async logout(req, res) {
        req.session.destroy(err => {
            if (err) return res.status(500).send('Could not log out');
            res.redirect('/');
        });
    }

    async register(req, res) {
        await AuthService.register(req.body)
        res.redirect('/users/profile')
    }

    async renderloginPage(req, res) {
        res.render('auth/login');
    }
    async renderRegPage(req, res) {
        res.render('auth/register');
    }
}

module.exports = new AuthController()