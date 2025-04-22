const moduleModel = require('../models/module')

class ModuleController {
    async renderModulesPage (req, res) {
        const modules = await moduleModel.getAll()
        const coreModules = modules.filter(m => m.isCore)
        const extraModules = modules.filter(m => !m.isCore)
        res.render('modules', {coreModules, extraModules}); 
    }
    
    async enabled (req, res) {
        await moduleModel.enabled(req.params.id)
        res.redirect('/admin/modules');
        
    }
    async disabled (req, res) {
        await moduleModel.disabled(req.params.id)
        res.redirect('/admin/modules');
    }
}

module.exports = new ModuleController()