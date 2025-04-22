class AuthPageController {
    async renderloginPage(req, res) {
        res.render('auth/auth');
    }
}

module.exports = new AuthPageController()