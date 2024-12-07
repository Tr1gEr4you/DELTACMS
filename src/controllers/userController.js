const userModel = require('../models/user')

module.exports = {
    getAll: async function (req, res) {
        const users = await userModel.getAll();
        return res.render('users', {users: users})
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
    removeById: async function (req, res) {
        await userModel.removeById(req.params.id);
    }
}