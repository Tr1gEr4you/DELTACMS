const serverModel = require('../models/server-source')

module.exports = { 
    showServerEditPage: async function (req, res) {
        res.render('monitoring/admin/index')
    }, 
    showServerAddPage: async function (req, res) {
        res.render('monitoring/admin/add')
    },
    create: async function (req, res) {
        const {ip, port}  = req.body;
            
        await serverModel.create(ip, port)
        res.redirect('/admin/servers')
    },
    renderPage: async function (req, res) {
        const servers = await serverModel.getAll();
        console.log(servers)
        return res.render('servers', { servers })
    },
}