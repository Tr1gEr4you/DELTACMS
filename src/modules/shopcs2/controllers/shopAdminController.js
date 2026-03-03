const ShopService = require('../services/shopService')

class ShopAdminController {
    async renderSettingsPage(req, res) {
        const settings = await ShopService.getSettings()
        res.render('shopcs2/index', {settings})
    }
    async updateDatbaseConfig(req, res) {
        const data = req.body;
        await ShopService.updateDatbaseConfig(data)
        res.redirect('/admin/modules')
    }
}

module.exports = new ShopAdminController()