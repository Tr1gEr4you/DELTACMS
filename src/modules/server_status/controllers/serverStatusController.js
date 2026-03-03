const ServerStatusService = require('../services/serverStatusService')
const ServersService = require('../../servers/services/serverService')

class ServerStatusController {
    async updateInBackground() {
        setInterval(async () => {
            const servers = await ServersService.getAll();
            ServerStatusService.updateAllServerStatuses(servers)
        }, 60000)
    }
    async renderPage(req, res) {
        const servers = await ServerStatusService.getAllCurrent()
        res.render('monitoring/index', {servers})
    }
}

module.exports = new ServerStatusController()