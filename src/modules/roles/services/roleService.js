const RoleModel = require('../models/roleModel')

class RoleService {
    async getAll () {
        return await RoleModel.getAll()
    }

    async getById (id) {
        return await RoleModel.getById(id);
    }

    async create ({name, flags}) {
        return await RoleModel.create(name, flags)
    }

    async delete (id) {
        return await RoleModel.delete(id)
    }

    async update (id, {name, flags}) {
        return await RoleModel.update(id, name, flags)
    }

}

module.exports = new RoleService()