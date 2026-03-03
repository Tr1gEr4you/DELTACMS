const PageModel = require("../models/pageModel");

class PageService {
    async getAllPages() {
        return await PageModel.getAll();
    }

    async getById(id) {
        if (!id) throw new Error("ID страницы обязателен");
        return await PageModel.getById(id);
    }

    async getPageByRoute(route) {
        if (!route) throw new Error("Route обязателен");
        return await PageModel.getByRoute(route);
    }

    async create(data) {
        const { title, route, content, status } = data;

        if (!title || !route) {
            throw new Error("Поле title и route обязательны");
        }

        const existing = await PageModel.getByRoute(route);
        if (existing) {
            throw new Error("Страница с таким route уже существует");
        }

        return await PageModel.create({ title, route, content, status });
    }

    async update(id, data) {
        if (!id) throw new Error("ID страницы обязателен");

        const existing = await PageModel.getById(id);
        if (!existing) throw new Error("Страница не найдена");

        const { title, route, content, status } = data;
        if (!title || !route) {
            throw new Error("Поле title и route обязательны");
        }

        return await PageModel.update(id, { title, route, content, status });
    }

    async delete(id) {
        if (!id) throw new Error("ID обязателен");
        return await PageModel.delete(id);
    }

    async getPagesCount() {
        return await PageModel.getCount();
    }
}

module.exports = new PageService();