const UserService = require('../services/userService')

class UserPageController {
    async renderProfilePage (req, res) {
        res.render('users/profile') 
    }
    async renderSettingsPage (req, res) {
        res.render('users/settings')
    }
}

module.exports = new UserPageController()