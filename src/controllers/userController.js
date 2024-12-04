const userModel = require('../models/user')

module.exports = {
    getAll: function (req, res) {
        return res.render('users', {users: userModel.getAll()})
    },
    getById: function (req, res) {
        const user = userModel.getById(req.params.id);
        res.render('user', {user: user})
        if (user) {
            res.render('user', {user: user})
        } else {
            res.sendStatus(404);
        }
    },
    removeById: function (req, res) {
        const user = userModel.removeById(req.params.id);
        if (user) {
            res.send("Успешно");
        } else {
            res.sendStatus(404);
        }
    }
}