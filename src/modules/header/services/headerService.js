const HeaderModel = require("../models/headerModel");

class HeaderService {
  async getAllButtons() {
    return await HeaderModel.getAllButtons();
  }

  async getActiveButtons() {
    return await HeaderModel.getActiveButtons();
  }

  async getByIdButtons(id) {
    if (!id) throw new Error("ID кнопки обязателен");
    return await HeaderModel.getByIdButtons(id);
  }

  async create(data) {
    const { label, url, position, active } = data;

    if (!label || !url) {
      throw new Error("Поля label и url обязательны");
    }

    return await HeaderModel.create({
      label,
      url,
      position: position || 0,
      active: active ? 1 : 0,
    });
  }

  async update(id, data) {
    if (!id) throw new Error("ID кнопки обязателен");

    const existing = await HeaderModel.getByIdButtons(id);
    if (!existing) throw new Error("Кнопка не найдена");

    const { label, url, position, active } = data;

    if (!label || !url) {
      throw new Error("Поля label и url обязательны");
    }

    return await HeaderModel.update(id, {
      label,
      url,
      position: position || 0,
      active: active ? 1 : 0,
    });
  }

  async delete(id) {
    if (!id) throw new Error("ID обязателен");
    return await HeaderModel.delete(id);
  }
}

module.exports = new HeaderService();