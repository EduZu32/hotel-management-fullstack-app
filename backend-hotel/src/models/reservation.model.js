const db = require("../config/db");

const Reservation = {
  // Obtener todas las reservas con info de cliente, invitado y habitación
  getAll: (callback) => {
    const sql = `
      SELECT * 
      FROM reservation
      LEFT JOIN client ON client.client_id = res_client_id
      LEFT JOIN guest ON guest.guest_id = res_guest_id
      LEFT JOIN room ON room.room_id = res_room_id
    `;
    db.query(sql, callback);
  },

  // Obtener una reserva por ID (falta LEFT JOIN en lugar de FULL JOIN para compatibilidad MySQL)
  getById: (id, callback) => {
    const sql = `
      SELECT * 
      FROM reservation
      LEFT JOIN client ON client.client_id = res_client_id
      LEFT JOIN room ON room.room_id = res_room_id
      WHERE res_id = ?
    `;
    db.query(sql, [id], callback);
  },

  // Crear una nueva reserva
  create: (data, callback) => {
    const sql = `
    INSERT INTO reservation (
      res_client_id, res_guest_id, res_room_id, res_room_hotel_id,
      res_checkin, res_checkout, res_is_closed,
      res_checkin_by, res_checkout_by, res_observations,
      res_adults, res_children
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
    const values = [
      data.res_client_id || null,
      data.res_guest_id || null,
      data.res_room_id,
      data.res_room_hotel_id,
      data.res_checkin,
      data.res_checkout,
      data.res_is_closed || 0,
      data.res_checkin_by || null,
      data.res_checkout_by || null,
      data.res_observations || "",
      Number.isInteger(data.res_adults) ? data.res_adults : 1,
      Number.isInteger(data.res_children) ? data.res_children : 0,
    ];
    db.query(sql, values, callback);
  },

  // Actualizar una reserva por ID
  update: (id, data, callback) => {
    const sql = `
      UPDATE reservation SET 
        res_client_id = ?, res_guest_id = ?, res_room_id = ?, res_room_hotel_id = ?,
        res_checkin = ?, res_checkout = ?, res_is_closed = ?, 
        res_checkin_by = ?, res_checkout_by = ?, res_observations = ?
      WHERE res_id = ?
    `;
    const values = [
      data.res_client_id || null,
      data.res_guest_id || null,
      data.res_room_id,
      data.res_room_hotel_id,
      data.res_checkin,
      data.res_checkout,
      data.res_is_closed || 0,
      data.res_checkin_by || null,
      data.res_checkout_by || null,
      data.res_observations || "",
      id,
    ];
    db.query(sql, values, callback);
  },

  // Eliminar una reserva
  delete: (id, callback) => {
    db.query("DELETE FROM reservation WHERE res_id = ?", [id], callback);
  },

  // Obtener reservas de un cliente con detalles de habitación y factura
  getClientReservations: (clientId, callback) => {
    const sql = `
      SELECT 
        r.res_id AS id,
        DATE_FORMAT(r.res_checkin, '%Y-%m-%d') AS checkIn,
        DATE_FORMAT(r.res_checkout, '%Y-%m-%d') AS checkOut,
        DATE_FORMAT(i.invoice_date, '%Y-%m-%d') AS fechaReserva,
        rm.room_type AS tipoHabitacion,
        i.invoice_total_price AS precio,
        i.invoice_pay_method AS metodoPago
      FROM reservation r
      JOIN room rm ON r.res_room_id = rm.room_id
      JOIN invoice i ON i.invoice_res_id = r.res_id
      WHERE r.res_client_id = ?
      ORDER BY r.res_checkin DESC
    `;
    db.query(sql, [clientId], callback);
  },
};

module.exports = Reservation;
