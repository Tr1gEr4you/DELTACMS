const {getConnection} = require("../config/database");
const { editById } = require("../../modules/users/models/userModel");

module.exports = {
    getAll: async function () {
        const connection = await getConnection();
        try {
            const [rows, fields] = await connection.query('SELECT * FROM modules')
            const modules = rows
            return modules;
        } catch (err) {
            console.log(err);
        } finally {
            if (connection) connection.release();
        }
    },
    getByName: async function (name) {
      const connection = await getConnection()
      try {
        const [rows, fields] = await connection.query('SELECT * FROM modules WHERE moduleName = ?', [name])
        const modules = rows;
        return modules.moduleName;
      } catch (err) {
        console.log(err)
      } finally {
        if (connection) connection.release()
      }
    },
    enabled: async function (id) {
        const connection = await getConnection();
        try {
            await connection.query('UPDATE modules SET enabled = ? WHERE id = ?', [1, id])
        } catch (err) {
            console.log(err);
        } finally {
            if (connection) connection.release();
        }
    },
    disabled: async function (id) {
        const connection = await getConnection();
        try {
            await connection.query('UPDATE modules SET enabled = ? WHERE id = ?', [0, id])
        } catch (err) {
            console.log(err);
        } finally {
            if (connection) connection.release();
        }
    }
}