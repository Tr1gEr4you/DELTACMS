const userModel = require('../models/user')
const blogModel = require('../models/blog')
const serverModel = require('../models/server-source')

module.exports = {
    showMainPage: function (req, res) {
        res.render('admin/admin');
    },
}