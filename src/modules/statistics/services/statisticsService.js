const StatisticsModel = require('../models/statisticsModels')

class StatisticsSerivce {
    async getCountUsers() {
        return StatisticsModel.getCountUsers()
    }
    async getLatestUsers() {
        return StatisticsModel.getLatestUsers()
    }
    async getRegistrationsByDay() {
        return StatisticsModel.getRegistrationByDay()
    }
}

module.exports = new StatisticsSerivce()