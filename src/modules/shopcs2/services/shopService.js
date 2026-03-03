const ShopModel = require('../models/shopModel')

class ShopService {
    async getAll() {
        return await ShopModel.getAll();
    }
    async getSettings() {
        return await ShopModel.getSettings()
    }
    async updateDatbaseConfig(data) {
        return await ShopModel.updateDatbaseConfig(data)
    }
}

module.exports = new ShopService();