const userModel = require('../models/user')

module.exports = {
    showMainPage: function (req, res) {
        res.render('admin/admin');
    },
    showUserEditPage: async function (req, res) {
        res.render('admin/users', {users: await userModel.getAll(), userCount: await userModel.getCount(), adminCount: await userModel.getCountAdmin()});
    },
    showUser: async function (req, res) {
        res.render('admin/user', {user: await userModel.getById(req.params.id)})
    },
}