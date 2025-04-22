const GlobalSettingsService = require('../services/GlobalSettingsService')

class GlobalSettingsController {
    async renderSettingsPage (req, res) {
        try {
            const theme = await GlobalSettingsService.getCurrentTheme()
            const settings = await GlobalSettingsService.getAll()

            res.render('settings', {theme, settings})
        } catch (err) {
            res.status(500).send('Internal Server Error');
        }
    }
    async update (req, res) {
        try {
            const settings = req.body;
            await GlobalSettingsService.update(settings)
            res.redirect('/admin/settings')
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new GlobalSettingsController();