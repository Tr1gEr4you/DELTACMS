const serverModel = require('../models/server-source')

module.exports = { 
    showServerEditPage: async function (req, res) {
        res.render('admin/servers/index', {servers: await serverModel.getAll(), serverCount: await serverModel.getCount()})
    }, 
    showServerAddPage: async function (req, res) {
        res.render('admin/servers/add')
    },
    create: async function (req, res) {
        const {ip, port}  = req.body;
            
        await serverModel.create(ip, port)
        res.redirect('/admin/servers')
    },
}