const RconService = require('../services/rconService')

class RconAdminController{
    async renderPage (req, res) {
        const { id } = req.params;
        const server = await RconService.getServerById(id)
        res.render('rcon/rcon', {server, response: null})
    }

    async sendCommand(req, res) {
        try {
            const { id } = req.params;
            const { command } = req.body;

            const server = await RconService.getServerById(id)

            const response = await RconService.sendCommand(server, command)
            console.log(response)
            res.render('rcon/rcon', {server, response})
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new RconAdminController()