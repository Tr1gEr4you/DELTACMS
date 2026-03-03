const RconModel = require('../models/rconModel')
const Rcon = require('rcon')

class RconService {
    async getServerById(id) {
        return await RconModel.getServerByID(id)
    }

    async sendCommand(server, command) {
        return new Promise((resolve, reject) => {
            const rcon = new Rcon(server.ip, server.port, server.rcon_password);

            rcon.on('auth', () => {
                rcon.send(command);
            });

            rcon.on('response', (response) => {
                rcon.disconnect();
                resolve(response);
            });
        
            rcon.on('error', (err) => {
                rcon.disconnect();
                reject(err);
            });
        
            rcon.on('end', () => {
                rcon.disconnect();
            });

            rcon.connect();
        });
    }
}

module.exports = new RconService()

