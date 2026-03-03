const ShopService = require('../services/shopService')

class ShopController {
    async renderPage(req, res) {
        try {
            const users = await ShopService.getAll();
            res.render('stats/cs2/index', {users})
        } catch (err) {
            res.render('stats/cs2/index', {users: null})
        }    
    }
}

module.exports = new ShopController()