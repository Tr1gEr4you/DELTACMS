const StatisticsSerivce = require('../services/statisticsService')

class StatisticsAdminController {
    async renderPage (req, res) {
        const countUsers = await StatisticsSerivce.getCountUsers()
        const latestUsers = await StatisticsSerivce.getLatestUsers()
        const registrationsUsersByDay = await StatisticsSerivce.getRegistrationsByDay()
        res.render('statistics/index', {countUsers, latestUsers, registrationsUsersByDay})
    }
}

module.exports = new StatisticsAdminController()