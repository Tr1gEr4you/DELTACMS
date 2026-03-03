const { getConnection } = require("../../../core/config/database");

class HeaderModel {
  async getAllButtons() {
    const connection = await getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM header_buttons ORDER BY position ASC');
      return rows;
    } catch (err) {
      console.log(err);
      return [];
    } finally {
      if (connection) connection.release();
    }
  }

  async getByIdButtons(id) {
    const connection = await getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM header_buttons WHERE id = ?', [id]);
      return rows[0] || null;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      if (connection) connection.release();
    }
  }

  async create({ label, url, position, active }) {
    const connection = await getConnection();
    try {
      await connection.query(
        'INSERT INTO header_buttons (label, url, position, active) VALUES (?, ?, ?, ?)',
        [label, url, position, active]
      );
    } catch (err) {
      console.log(err);
    } finally {
      if (connection) connection.release();
    }
  }

  async update(id, { label, url, position, active }) {
    const connection = await getConnection();
    try {
      await connection.query(
        'UPDATE header_buttons SET label = ?, url = ?, position = ?, active = ? WHERE id = ?',
        [label, url, position, active, id]
      );
    } catch (err) {
      console.log(err);
    } finally {
      if (connection) connection.release();
    }
  }

  async delete(id) {
    const connection = await getConnection();
    try {
      await connection.query('DELETE FROM header_buttons WHERE id = ?', [id]);
    } catch (err) {
      console.log(err);
    } finally {
      if (connection) connection.release();
    }
  }

  async getActiveButtons() {
    const connection = await getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM header_buttons WHERE active = 1 ORDER BY position ASC');
      return rows;
    } catch (err) {
      console.log(err);
      return [];
    } finally {
      if (connection) connection.release();
    }
  }
}

module.exports = new HeaderModel();