const userModel = require('../models/user')
const bcrypt = require('bcrypt')

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
    },
    create: async function (req, res) {
        const {login, password, flags}  = req.body;

        const hashedPassword = await bcrypt.hash(password, 10)
    
        await userModel.create(login, hashedPassword, flags)
        res.redirect('/admin/users') 
    },
    showUserEditPage: async function (req, res) {
        res.render('admin/users/index', {users: await userModel.getAll(), userCount: await userModel.getCount(), adminCount: await userModel.getCountAdmin()});
    },
    showUser: async function (req, res) {
        res.render('admin/users/show', {user: await userModel.getById(req.params.id)})
    },
    showUserAddPage: async function (req, res) {
        res.render('admin/users/add')
    },
    showUserDeletePage: async function (req, res) {
        res.render('admin/users/delete')
    },
    findByLogin: async function (req, res) {
        try {
            const user = await userModel.findByLogin(req.params.login)
            const password = req.params.password;

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            res.status(200).json({ message: 'Login successful', user });
        } catch (err) {
            console.log(err)
        }
    }
}