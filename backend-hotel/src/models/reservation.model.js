const db = require("../config/db");

const Reservation = {
  // Obtener todas las reservas con info de cliente, invitado y habitación
  getAll: (callback) => {
    const sql = `
    SELECT 
      reservation.res_id,
      reservation.res_checkin,
      reservation.res_checkout,
      reservation.res_observations,
      reservation.res_bed_preference,
      reservation.res_adults,
      reservation.res_children,
      client.client_name,
      client.client_lastname,
      guest.guest_name,
      guest.guest_lastname,
      room.room_number,
      room.room_type
    FROM reservation
    LEFT JOIN client ON client.client_id = reservation.res_client_id
    LEFT JOIN guest ON guest.guest_id = reservation.res_guest_id
    LEFT JOIN room ON room.room_id = reservation.res_room_id
  `;
    db.query(sql, callback);
  },

  // Obtener una reserva por ID completa (cliente o invitado)
  getById: (id, callback) => {
    const sql = `
    SELECT 
      r.res_id,
      r.res_checkin,
      r.res_checkout,
      r.res_observations,
      r.res_bed_preference,
      r.res_adults,
      r.res_children,
      r.res_is_closed AS state,
      r.res_room_id,
      rm.room_type,

      -- Cliente (si existe)
      c.client_id,
      c.client_name,
      c.client_surname_one,
      c.client_surname_two,
      c.client_doc_type,
      c.client_doc_id,
      c.client_telephone,
      c.client_email,

      -- Invitado (si existe), renombramos campos para que el Front los pueda usar igual
      g.guest_id AS guest_id,
      g.guest_name AS guest_name,
      g.guest_lastname AS guest_lastname,
      g.guest_email AS guest_email,
      g.guest_phone AS guest_phone,
      g.guest_preferences AS guest_preferences

    FROM reservation r
    LEFT JOIN client c ON c.client_id = r.res_client_id
    LEFT JOIN guest g ON g.guest_id = r.res_guest_id
    LEFT JOIN room rm ON rm.room_id = r.res_room_id
    WHERE r.res_id = ?
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
      res_bed_preference,
      res_adults, res_children
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      data.res_bed_preference || "",
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
      res_checkin_by = ?, res_checkout_by = ?, res_observations = ?, res_bed_preference = ?
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
      data.res_bed_preference || "",
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
