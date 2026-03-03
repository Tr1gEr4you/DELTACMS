const ServerStatusModel = require('../models/serverStatusModel');
const { GameDig } = require('gamedig');

class ServerStatusService {
    async fetchAndUpdateServerStatus(server) {
        try {
            const status = await GameDig.query({
                type: 'counterstrike2',
                host: server.ip,
                port: server.port,
            });

            status.status = 'Online';

            await ServerStatusModel.update(
                server.id,
                status.name || 'Неизвестно',
                status.map || 'Неизвестно',
                status.players?.length || 0,
                status.maxplayers || 0,
                status.status
            );
        } catch (err) {
            await ServerStatusModel.updateStatusOnly(server.id, 'Offline');
        }
    }

    async updateAllServerStatuses(servers) {
        for (const server of servers) {
            await this.fetchAndUpdateServerStatus(server);
        }
    }

    async getAllCurrent () {
        return await ServerStatusModel.getAllCurrent()
    }

    async getAllStats(serverId, days) {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        startDate.setHours(0, 0, 0, 0); // начало дня

        // Устанавливаем конец дня для endDate
        endDate.setHours(23, 59, 59, 999); // конец дня

        const formattedStartDate = startDate.toISOString().slice(0, 19).replace('T', ' ');
        const formattedEndDate = endDate.toISOString().slice(0, 19).replace('T', ' ');
        
        console.log(formattedStartDate, formattedEndDate)

        const stats = await ServerStatusModel.getAll(serverId, formattedStartDate, formattedEndDate);

        if (!Array.isArray(stats) || stats.length === 0) {
            return {
                averagePlayerCount: 0,
                mostFrequentMap: 'Нет данных',
                stats: [],
                mapCount: {},
                onlinePercentage: '0.00'
            };
        }

        const totalPlayers = stats.reduce((sum, stat) => sum + (stat.player_count || 0), 0);
        const averagePlayerCount = (totalPlayers / stats.length).toFixed(2);

        const mapCount = stats.reduce((acc, stat) => {
            const map = stat.map_name || 'Неизвестно';
            acc[map] = (acc[map] || 0) + 1;
            return acc;
        }, {});

        const mostFrequentMap = Object.entries(mapCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Нет данных';

        const onlineCount = stats.filter(stat => stat.status === 'Online').length;
        const onlinePercentage = ((onlineCount / stats.length) * 100).toFixed(2);

        return {
            averagePlayerCount,
            mostFrequentMap,
            stats,
            mapCount,
            onlinePercentage
        };
    }
}

module.exports = new ServerStatusService();