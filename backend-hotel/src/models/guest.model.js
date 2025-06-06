const db = require("../config/db");

const Guest = {
  getAll: (callback) => {
    const sql = "SELECT * FROM guest ORDER BY guest_id DESC";
    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = "SELECT * FROM guest WHERE guest_id = ?";
    db.query(sql, [id], callback);
  },

  create: (data, callback) => {
    const sql = `
      INSERT INTO guest (
        guest_name, guest_lastname, guest_email,
        guest_phone, guest_preferences
      ) VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      data.guest_name,
      data.guest_lastname,
      data.guest_email || null,
      data.guest_phone || null,
      data.guest_preferences || null,
    ];
    db.query(sql, values, callback);
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM guest WHERE guest_id = ?";
    db.query(sql, [id], callback);
  },
};

module.exports = Guest;
