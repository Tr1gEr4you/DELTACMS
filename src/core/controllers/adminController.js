const moduleModel = require('../models/module')

class adminController {
    async renderMainPage (req, res) {
        res.render('admin');
    }
    async renderSettingsPage (req, res) {
        res.render('settings/index');
    }
    async renderLoginPage (req, res) {
        res.render('auth/auth')
    }
    async renderDashboardPage (req, res) {
        res.render('dashboard')
    }
    async renderModulesPage (req, res) {
        res.render('modules', {modules: await moduleModel.getAll()}); 
    }
}

module.exports = new adminController()