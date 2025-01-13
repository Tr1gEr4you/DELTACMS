const serverModel = require('../models/server-source')

module.exports = {
    showMainPage: function (req, res) {
        return res.render('index');   
    },
    showMonitoringPage: async function (req, res) {
        const servers = await serverModel.getAll();
        return res.render('servers', {servers: servers})
    },
}