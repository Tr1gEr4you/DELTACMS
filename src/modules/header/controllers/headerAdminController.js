const HeaderService = require('../services/headerService')

class HeaderAdminController {
    async renderListPage (req, res) {
        const buttons = await HeaderService.getAllButtons();
        res.render('header/list', {buttons})
    }

    async renderAddPage (req, res) {
        res.render('header/add')
    }

    async renderEditPage (req, res) {
        const button = await HeaderService.getByIdButtons(req.params.id)
        res.render('header/edit', {button})
    }

    async create(req, res) {
        try {
          await HeaderService.create(req.body);
          res.redirect('/admin/header')
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Ошибка при создании кнопки', message: err.message });
        }
      }
    
    async update(req, res) {
        try {
          const buttonId = req.params.id;
          const buttonData = req.body;
          await HeaderService.update(buttonId, buttonData);
          res.redirect('/admin/header')
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Ошибка при обновлении кнопки', message: err.message });
        }
      }
    
    async delete(req, res) {
        try {
          await HeaderService.delete(req.params.id);
          res.redirect('/admin/header')
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Ошибка при удалении кнопки', message: err.message });
        }
      }
}

module.exports = new HeaderAdminController()