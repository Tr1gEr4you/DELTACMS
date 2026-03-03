const pageService = require('../services/pageService');

class PageController {
    async create(req, res) {
        try {
            await pageService.create(req.body);
            res.redirect('/admin/pages');
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка при создании страницы', message: err.message });
        }
    }

    async update(req, res) {
        try {
            const pageId = req.params.id;
            const pageData = req.body;

            await pageService.update(pageId, pageData);
            res.redirect('/admin/pages');
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка при обновлении страницы', message: err.message });
        }
    }

    async delete(req, res) {
        try {
            await pageService.delete(req.params.id);
            res.redirect('/admin/pages');
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка при удалении страницы', message: err.message });
        }
    }
}

module.exports = new PageController();