const userModel = require('../models/user')

module.exports = {
    getAll: function (req, res) {
        return res.render('users', {users: userModel.getAll()})
    }
}