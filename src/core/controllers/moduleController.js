const path = require('path');
const fs = require('fs');
const unzipper = require('unzipper');

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
    async upload (req, res) {
        try {
            const file = req.file;
            if (!file) return res.status(400).send('Файл не был загружен');
      
            const moduleName = path.basename(file.originalname, '.zip');
            const moduleDir = path.join(__dirname, '../../modules', moduleName);
      
            // Создаём целевую папку (например, modules/test-module)
            if (!fs.existsSync(moduleDir)) {
              fs.mkdirSync(moduleDir, { recursive: true });
            }
      
            // Распаковываем прямо в неё
            await fs.createReadStream(file.path)
              .pipe(unzipper.Extract({ path: moduleDir }))
              .promise();
      
            fs.unlinkSync(file.path); // удаляем исходный zip
            res.send('Модуль установлен');
      
          } catch (err) {
            console.error('Ошибка при установке модуля:', err);
            res.status(500).send('Ошибка при установке модуля');
          }
    }
}

module.exports = new ModuleController()