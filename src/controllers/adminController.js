const userModel = require('../models/user')

module.exports = {
    showMainPage: function (req, res) {
        res.render('admin/admin');
    },
    showUserEditPage: function (req, res) {
        res.render('admin/users', {users: userModel.getAll()});
    },
    showUser: function (req, res) {
        const user = userModel.getById(req.params.id);
        if (user) {
            res.render('admin/user', {user: user})
        } else {
            res.sendStatus(404);
        }
    },
}