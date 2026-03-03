const HeaderButtonService = require('../services/headerService');

class HeaderApiController {
  async create(req, res) {
    try {
      await HeaderButtonService.create(req.body);
      res.status(201).json({ message: 'Кнопка добавлена' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка при создании кнопки', message: err.message });
    }
  }

  async update(req, res) {
    try {
      const buttonId = req.params.id;
      const buttonData = req.body;
      await HeaderButtonService.update(buttonId, buttonData);
      res.status(200).json({ message: 'Кнопка обновлена' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка при обновлении кнопки', message: err.message });
    }
  }

  async delete(req, res) {
    try {
      await HeaderButtonService.delete(req.params.id);
      res.status(200).json({ message: 'Кнопка удалена' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка при удалении кнопки', message: err.message });
    }
  }
}

module.exports = new HeaderApiController();