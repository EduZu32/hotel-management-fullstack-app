const connection = require("../config/db");

const Room = {
  searchRooms: (checkIn, checkOut, totalGuests, callback) => {
    if (typeof callback !== "function") {
      console.error("Error: callback no es una función");
      return;
    }

    const sql = `
      SELECT r.room_id, r.room_hotel_id, r.room_type, r.room_capacity,
             CAST(t.room_mts_square AS UNSIGNED) AS room_mts_square, 
             t.room_has_views, t.room_has_jacuzzi,
             t.room_has_balcony, t.room_has_service,
             t.room_price
      FROM room r
      JOIN type_room t ON r.room_type = t.room_type
      WHERE r.room_capacity >= ?
      AND r.room_is_enabled = 1
      AND r.room_id NOT IN (
        SELECT DISTINCT res_room_id FROM reservation
        WHERE NOT (
          ? >= res_checkout OR
          ? <= res_checkin
        )
      )
    `;

    const queryParams = [totalGuests, checkIn, checkOut];

    //console.log("Ejecutando consulta SQL con valores:", queryParams);

    connection.query(sql, queryParams, (err, results) => {
      if (err) {
        console.error("Error en la consulta SQL:", err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  getAll: (callback) => {
    const sql = `
      SELECT r.room_id, r.room_hotel_id, r.room_type, r.room_capacity, r.room_is_enabled,
             CAST(t.room_mts_square AS UNSIGNED) AS room_mts_square, 
             t.room_has_views, t.room_has_jacuzzi,
             t.room_has_balcony, t.room_has_service,
             t.room_price
      FROM room r
      JOIN type_room t ON r.room_type = t.room_type
    `;
    connection.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = `
      SELECT r.room_id, r.room_hotel_id, r.room_type, r.room_capacity,
             CAST(t.room_mts_square AS UNSIGNED) AS room_mts_square, 
             t.room_has_views, t.room_has_jacuzzi,
             t.room_has_balcony, t.room_has_service,
             t.room_price
      FROM room r
      JOIN type_room t ON r.room_type = t.room_type
      WHERE r.room_id = ?
    `;
    connection.query(sql, [id], callback);
  },

  create: (roomData, callback) => {
    const { room_hotel_id, room_type, room_capacity } = roomData;
    if (!room_hotel_id || !room_type || !room_capacity) {
      return callback(new Error("All fields are required"), null);
    }

    const sql = `
      INSERT INTO room (room_hotel_id, room_type, room_capacity)
      VALUES (?, ?, ?)
    `;
    connection.query(sql, [room_hotel_id, room_type, room_capacity], callback);
  },

  update: (id, roomData, callback) => {
    const { room_hotel_id, room_type, room_capacity } = roomData;
    if (!room_hotel_id || !room_type || !room_capacity) {
      return callback(new Error("All fields are required"), null);
    }

    const sql = `
      UPDATE room 
      SET room_hotel_id = ?, room_type = ?, room_capacity = ?
      WHERE room_id = ?
    `;
    connection.query(
      sql,
      [room_hotel_id, room_type, room_capacity, id],
      callback
    );
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM room WHERE room_id = ?";
    connection.query(sql, [id], callback);
  },

  enableRoom: (id, callback) => {
    const sql = "UPDATE room SET room_is_enabled = 1 WHERE room_id = ?";
    connection.query(sql, [id], callback);
  },

  disableRoom: (id, callback) => {
    const sql = "UPDATE room SET room_is_enabled = 0 WHERE room_id = ?";
    connection.query(sql, [id], callback);
  },

  getEnabledRooms: (callback) => {
    const sql = `
      SELECT r.room_id, r.room_hotel_id, r.room_type, r.room_capacity,
             CAST(t.room_mts_square AS UNSIGNED) AS room_mts_square, 
             t.room_has_views, t.room_has_jacuzzi,
             t.room_has_balcony, t.room_has_service,
             t.room_price
      FROM room r
      JOIN type_room t ON r.room_type = t.room_type
      WHERE r.room_is_enabled = 1
    `;
    connection.query(sql, callback);
  },

  getDisabledRooms: (callback) => {
    const sql = `
      SELECT r.room_id, r.room_hotel_id, r.room_type, r.room_capacity,
             CAST(t.room_mts_square AS UNSIGNED) AS room_mts_square, 
             t.room_has_views, t.room_has_jacuzzi,
             t.room_has_balcony, t.room_has_service,
             t.room_price
      FROM room r
      JOIN type_room t ON r.room_type = t.room_type
      WHERE r.room_is_enabled = 0
    `;
    connection.query(sql, callback);
  },
};

module.exports = Room;
