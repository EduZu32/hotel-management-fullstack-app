const connection = require("../config/db");

const Hotel = {
  getAll: (callback) => {
    connection.query("SELECT * FROM hotel", callback);
  },
  getById: (id, callback) => {
    connection.query("SELECT * FROM hotel WHERE hotel_id = ?", [id], callback);
  },
  create: (hotelData, callback) => {
    connection.query("INSERT INTO hotel SET ?", hotelData, callback);
  },
  update: (id, hotelData, callback) => {
    connection.query(
      "UPDATE hotel SET ? WHERE hotel_id = ?",
      [hotelData, id],
      callback
    );
  },
  delete: (id, callback) => {
    connection.query("DELETE FROM hotel WHERE hotel_id = ?", [id], callback);
  },
};

module.exports = Hotel;
