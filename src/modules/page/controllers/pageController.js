const PageService = require('../services/pageService')

class PageController {
    async renderPage (req, res) {
        const fullPath = req.path.substring(1)
        const page = await PageService.getPageByRoute(fullPath)
        res.render('pages/page', {page})
    }
}

module.exports = new PageController()