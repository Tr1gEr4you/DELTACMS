const PageService = require('../services/PageService')

class PageController {
    async renderListPage (req, res) {
        const pages = await PageService.getAllPages();
        res.render('pages/list', {pages})
    }
    async renderAddPage (req, res) {
        res.render('pages/add')
    }
    async renderEditPage (req, res) {
        const page = await PageService.getById(req.params.id)
        res.render('pages/edit', {page})
    }
    async create(req, res) {
        try {
            await PageService.create(req.body);
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

            await PageService.update(pageId, pageData);
            res.redirect('/admin/pages');
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка при обновлении страницы', message: err.message });
        }
    }

    async delete(req, res) {
        try {
            await PageService.delete(req.params.id);
            res.redirect('/admin/pages');
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка при удалении страницы', message: err.message });
        }
    }
}

module.exports = new PageController()