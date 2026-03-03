const ServerStatusService = require('../services/serverStatusService')
const ServersService = require('../../servers/services/serverService')

class ServerStatusController {
    async renderStatsPage(req, res) {
        const { id } = req.params;
        const {
            averagePlayerCount,
            mostFrequentMap,
            stats,
            mapCount,
            onlinePercentage
        } = await ServerStatusService.getAllStats(id, 7);

        const days = Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            return date.toISOString().split('T')[0];
        });

        const playerCounts = stats.map(stat => stat.player_count || 0);

        res.render('servers/stats', {
            days,
            playerCounts,
            averagePlayerCount,
            mostFrequentMap,
            mapCount,
            onlinePercentage
        });
    }
  }

module.exports = new ServerStatusController()