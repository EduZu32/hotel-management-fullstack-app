const Guest = require("../models/guest.model");
const Reservation = require("../models/reservation.model");
const connection = require("../config/db");
const path = require("path");
const fs = require("fs");

//Consulta para verificar solapamiento de reservas
const checkOverlapQuery = `
  SELECT * FROM reservation 
  WHERE res_room_id = ? 
    AND res_room_hotel_id = ?
    AND res_is_closed = 0
    AND (
      (? BETWEEN res_checkin AND res_checkout)
      OR (? BETWEEN res_checkin AND res_checkout)
      OR (res_checkin BETWEEN ? AND ?)
    )
`;

// Obtener todas las reservas
const getReservations = (req, res) => {
  const { room, doc_id, name, checkin } = req.query;

  let sql = `
    SELECT 
      r.*, 
      c.client_name, c.client_doc_id,
      g.guest_name, g.guest_lastname
    FROM reservation r
    LEFT JOIN client c ON r.res_client_id = c.client_id
    LEFT JOIN guest g ON r.res_guest_id = g.guest_id
    WHERE 1 = 1
  `;
  const params = [];

  if (room) {
    sql += " AND r.res_room_id = ?";
    params.push(room);
  }
  if (doc_id) {
    sql += " AND c.client_doc_id LIKE ?";
    params.push(`%${doc_id}%`);
  }
  if (name) {
    sql += " AND (c.client_name LIKE ? OR g.guest_name LIKE ?)";
    params.push(`%${name}%`, `%${name}%`);
  }
  if (checkin) {
    sql += " AND DATE(r.res_checkin) = ?";
    params.push(checkin);
  }

  connection.query(sql, params, (err, results) => {
    if (err)
      return res.status(500).json({ error: "Error interno del servidor" });
    res.json(results);
  });
};

//Obtener reserva por ID
const getReservationById = (req, res) => {
  const { id } = req.params;
  Reservation.getById(id, (err, results) => {
    if (err) return res.status(500).json({ error: "Error interno" });
    if (results.length === 0)
      return res.status(404).json({ error: "No encontrada" });
    res.json(results[0]);
  });
};

//Crear reserva con invitado (sin cuenta)
const createReservationForGuest = (req, res) => {
  //console.log("Body recibido:", req.body);
  const {
    guest_name,
    guest_lastname,
    guest_email,
    guest_phone,
    guest_preferences,
    res_room_id,
    res_room_hotel_id,
    res_checkin,
    res_checkout,
    res_is_closed = 0,
    res_checkin_by,
    res_checkout_by,
    res_observations = "",
    res_adults,
    res_children,
    invoiceData = {},
  } = req.body;

  if (
    !guest_name ||
    !guest_lastname ||
    !res_room_id ||
    !res_checkin ||
    !res_checkout
  ) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const diffInMs = new Date(res_checkout) - new Date(res_checkin);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInDays <= 0) {
    return res
      .status(400)
      .json({ error: "La reserva debe tener mínimo 1 noche" });
  }

  const checkOverlapQuery = `
    SELECT * FROM reservation
    WHERE res_room_id = ?
      AND res_room_hotel_id = ?
      AND NOT (
        res_checkout <= ? OR res_checkin >= ?
      )
  `;

  connection.query(
    checkOverlapQuery,
    [res_room_id, res_room_hotel_id, res_checkin, res_checkout],
    (err, overlapResult) => {
      if (err) {
        return res.status(500).json({ error: "Error validando solapamiento" });
      }
      if (overlapResult.length > 0) {
        return res
          .status(400)
          .json({ error: "La habitación ya está reservada en esas fechas" });
      }

      const sqlGuest = `
        INSERT INTO guest (guest_name, guest_lastname, guest_email, guest_phone, guest_preferences)
        VALUES (?, ?, ?, ?, ?)
      `;

      connection.query(
        sqlGuest,
        [
          guest_name,
          guest_lastname,
          guest_email,
          guest_phone,
          guest_preferences,
        ],
        (err, result) => {
          if (err) {
            return res.status(500).json({ error: "Error guardando invitado" });
          }

          const guestId = result.insertId;

          connection.query(
            "SELECT * FROM employee WHERE emp_id = ?",
            [res_checkin_by],
            (err, employeeResult) => {
              if (err || employeeResult.length === 0) {
                return res.status(400).json({ error: "Empleado no válido" });
              }

              const data = {
                res_guest_id: guestId,
                res_client_id: null,
                res_room_id,
                res_room_hotel_id,
                res_checkin,
                res_checkout,
                res_is_closed,
                res_checkin_by,
                res_checkout_by,
                res_observations,
                res_adults,
                res_children,
              };

              Reservation.create(data, (err, result) => {
                if (err) {
                  return res.status(500).json({
                    error: "Error creando reserva",
                    details: err.message,
                  });
                }

                const res_id = result.insertId;

                //Calcular precio total de la reserva
                const roomTypeQuery = `
                  SELECT t.room_price 
                  FROM room r 
                  JOIN type_room t ON r.room_type = t.room_type
                  WHERE r.room_id = ?
                `;

                connection.query(
                  roomTypeQuery,
                  [res_room_id],
                  (err, priceResult) => {
                    if (err || priceResult.length === 0) {
                      return res
                        .status(500)
                        .json({ error: "No se pudo obtener el precio" });
                    }

                    const pricePerNight = parseFloat(priceResult[0].room_price);

                    const nights = Math.ceil(
                      (new Date(res_checkout) - new Date(res_checkin)) /
                        (1000 * 60 * 60 * 24)
                    );

                    const totalPrice = (pricePerNight * nights * 1.21).toFixed(
                      2
                    );

                    const sqlInvoice = `
                    INSERT INTO invoice (
                      invoice_code_transact, invoice_details,
                      invoice_guest_id, invoice_pay_method, invoice_points_used,
                      invoice_res_id, invoice_total_price, invoice_date
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE())
                  `;

                    connection.query(
                      sqlInvoice,
                      [
                        null,
                        invoiceData.invoice_details ||
                          `Reserva a nombre de ${guest_name} ${guest_lastname}`,
                        guestId,
                        invoiceData.invoice_pay_method,
                        invoiceData.invoice_points_used || 0,
                        res_id,
                        totalPrice,
                      ],
                      (err) => {
                        if (err) {
                          console.error(
                            "❌ Error MySQL al guardar factura:",
                            err
                          );
                          return res
                            .status(500)
                            .json({ error: "Error guardando factura" });
                        }

                        res.status(201).json({
                          message: "Reserva creada correctamente para invitado",
                          reservationId: res_id,
                          guestId,
                          totalPrice,
                        });
                      }
                    );
                  }
                );
              });
            }
          );
        }
      );
    }
  );
};

//Crear reserva con cliente registrado
const createReservation = (req, res) => {
  const {
    res_room_id,
    res_room_hotel_id,
    res_checkin,
    res_checkout,
    res_is_closed = 0,
    res_checkin_by,
    res_checkout_by,
    res_observations = "",
    res_adults,
    res_children,
    invoiceData = {},
  } = req.body;

  const clientId = req.user?.client_id;

  if (
    !clientId ||
    !res_room_id ||
    !res_room_hotel_id ||
    !res_checkin ||
    !res_checkout
  ) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const diffInMs = new Date(res_checkout) - new Date(res_checkin);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInDays <= 0) {
    return res
      .status(400)
      .json({ error: "La reserva debe tener mínimo 1 noche" });
  }

  const checkOverlapQuery = `
    SELECT * FROM reservation
    WHERE res_room_id = ?
      AND res_room_hotel_id = ?
      AND NOT (
        res_checkout <= ? OR res_checkin >= ?
      )
  `;

  connection.query(
    checkOverlapQuery,
    [res_room_id, res_room_hotel_id, res_checkin, res_checkout],
    (err, overlapResult) => {
      if (err) {
        return res.status(500).json({ error: "Error validando solapamiento" });
      }
      if (overlapResult.length > 0) {
        return res
          .status(400)
          .json({ error: "La habitación ya está reservada en esas fechas" });
      }

      connection.query(
        "SELECT * FROM employee WHERE emp_id = ?",
        [res_checkin_by],
        (err, employeeResult) => {
          if (err || employeeResult.length === 0) {
            return res.status(400).json({ error: "Empleado no válido" });
          }

          const data = {
            res_client_id: clientId,
            res_guest_id: null,
            res_room_id,
            res_room_hotel_id,
            res_checkin,
            res_checkout,
            res_is_closed,
            res_checkin_by,
            res_checkout_by,
            res_observations,
            res_adults,
            res_children,
          };

          Reservation.create(data, (err, result) => {
            if (err) {
              return res.status(500).json({
                error: "Error creando reserva",
                details: err.message,
              });
            }

            const res_id = result.insertId;

            //Calcular precio total de la reserva
            const roomTypeQuery = `
            SELECT t.room_price 
            FROM room r 
            JOIN type_room t ON r.room_type = t.room_type
            WHERE r.room_id = ?
          `;

            connection.query(
              roomTypeQuery,
              [res_room_id],
              (err, priceResult) => {
                if (err || priceResult.length === 0) {
                  return res
                    .status(500)
                    .json({ error: "No se pudo obtener el precio" });
                }

                const pricePerNight = parseFloat(priceResult[0].room_price);
                const nights = Math.ceil(
                  (new Date(res_checkout) - new Date(res_checkin)) /
                    (1000 * 60 * 60 * 24)
                );

                const basePrice = pricePerNight * nights;
                const iva = basePrice * 0.21;
                let totalPrice = basePrice + iva;

                //Descuento por puntos usados
                const puntosUsados = invoiceData.invoice_points_used || 0;
                let discount = 0;

                if (puntosUsados === 100) discount = totalPrice * 0.05;
                else if (puntosUsados === 200) discount = totalPrice * 0.1;

                totalPrice -= discount;
                totalPrice =
                  Math.round((totalPrice + Number.EPSILON) * 100) / 100; // 2 decimales reales

                const sqlInvoice = `
      INSERT INTO invoice (
        invoice_res_id, invoice_total_price,
        invoice_details, invoice_pay_method,
        invoice_points_used, invoice_client_id,
        invoice_date
      ) VALUES (?, ?, ?, ?, ?, ?, CURDATE())
    `;

                connection.query(
                  sqlInvoice,
                  [
                    res_id,
                    totalPrice,
                    invoiceData.invoice_details || "Reserva online",
                    invoiceData.invoice_pay_method,
                    puntosUsados,
                    clientId,
                  ],
                  (err) => {
                    if (err) {
                      return res
                        .status(500)
                        .json({ error: "Error guardando factura" });
                    }

                    //Puntos ganados
                    const puntosGanados = Math.round(totalPrice / 100) * 10;

                    //Guardar puntos en reserva
                    connection.query(
                      "UPDATE reservation SET res_add_points = ? WHERE res_id = ?",
                      [puntosGanados, res_id],
                      (err) => {
                        if (err)
                          console.error(
                            "Error guardando puntos en reserva:",
                            err
                          );
                      }
                    );

                    //Actualizar cuenta del cliente (sumar ganados, restar usados)
                    connection.query(
                      "UPDATE account SET account_points = account_points + ? - ? WHERE account_client_id = ?",
                      [puntosGanados, puntosUsados, clientId],
                      (err) => {
                        if (err)
                          console.error(
                            "Error actualizando puntos en cuenta:",
                            err
                          );
                      }
                    );

                    res.status(201).json({
                      message: "Reserva creada correctamente para cliente",
                      reservationId: res_id,
                      clientId,
                      puntosGanados,
                      puntosUsados,
                      totalPrice,
                    });
                  }
                );
              }
            );
          });
        }
      );
    }
  );
};

//Actualizar reserva
const updateReservation = (req, res) => {
  const { id } = req.params;
  const {
    res_client_id,
    res_guest_id,
    res_room_id,
    res_room_hotel_id,
    res_checkin,
    res_checkout,
    res_is_closed,
    res_checkin_by,
    res_checkout_by,
  } = req.body;

  if (!res_room_id || !res_checkin || !res_checkout) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }
  const diffInMs = new Date(res_checkout) - new Date(res_checkin);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInDays <= 0) {
    return res
      .status(400)
      .json({ error: "La reserva debe tener mínimo 1 noche" });
  }

  const data = {
    res_client_id: res_client_id || null,
    res_guest_id: res_guest_id || null,
    res_room_id,
    res_room_hotel_id,
    res_checkin,
    res_checkout,
    res_is_closed,
    res_checkin_by,
    res_checkout_by,
  };

  Reservation.update(id, data, (err) => {
    if (err)
      return res.status(500).json({ error: "Error actualizando reserva" });
    res.json({ message: "Reserva actualizada correctamente" });
  });
};

//Actualizar estado de reserva
const updateReservationStatus = (req, res) => {
  const reservationId = req.params.id;
  const { status, employeeId, checkin, checkout, observations, roomId } =
    req.body;

  const files = req.files;

  //console.log("Archivos recibidos:", files);

  const res_file_one = files?.res_file_one?.[0]?.filename ?? null;
  const res_file_two = files?.res_file_two?.[0]?.filename ?? null;
  const res_file_three = files?.res_file_three?.[0]?.filename ?? null;

  const updates = {
    res_is_checkin: status === "checkin" ? 1 : 0,
    res_is_checkout: status === "checkout" ? 1 : 0,
    res_is_closed: status === "closed" ? 1 : 0,
    res_checkin: checkin,
    res_checkout: checkout,
    res_observations: observations,
    res_room_id: roomId,
    res_checkin_by: status === "checkin" ? employeeId : null,
    res_checkout_by: status === "checkout" ? employeeId : null,
  };

  // Solo agregar campos de archivos si existen
  if (typeof res_file_one === "string") updates.res_file_one = res_file_one;
  if (typeof res_file_two === "string") updates.res_file_two = res_file_two;
  if (typeof res_file_three === "string")
    updates.res_file_three = res_file_three;

  const fields = Object.keys(updates);
  const values = Object.values(updates);

  const sql = `UPDATE reservation SET ${fields
    .map((field) => `${field} = ?`)
    .join(", ")} WHERE res_id = ?`;

  values.push(reservationId);

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error actualizando reserva:", err);
      return res.status(500).json({ error: "Error actualizando reserva" });
    }

    return res.json({ message: "Reserva actualizada correctamente" });
  });
};

//Eliminar reserva
const deleteReservation = (req, res) => {
  const { id } = req.params;

  // 1. Obtener puntos y cliente vinculados a la reserva
  const query = `
    SELECT res_add_points, res_client_id
    FROM reservation
    WHERE res_id = ?
  `;

  connection.query(query, [id], (err, results) => {
    if (err || results.length === 0) {
      return res.status(500).json({ error: "Error consultando reserva" });
    }

    const { res_add_points, res_client_id } = results[0];

    // 2. Si hay cliente, restar los puntos acumulados
    if (res_client_id && res_add_points > 0) {
      connection.query(
        "UPDATE account SET account_points = account_points - ? WHERE account_client_id = ?",
        [res_add_points, res_client_id],
        (err) => {
          if (err) {
            console.error("Error restando puntos del cliente:", err);
            // No cortamos aquí para que la reserva igualmente se borre
          }
        }
      );
    }

    // 3. Eliminar la reserva
    Reservation.delete(id, (err) => {
      if (err) {
        return res.status(500).json({ error: "Error eliminando reserva" });
      }

      res.json({ message: "Reserva eliminada correctamente" });
    });
  });
};

//Obtener reservas del cliente
const getMyReservations = (req, res) => {
  const clientId = req.user?.client_id;

  if (!clientId) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }

  const sql = `
    SELECT 
      r.res_id,
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

  connection.query(sql, [clientId], (err, results) => {
    if (err) {
      console.error("Error obteniendo reservas del cliente:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    res.json(results);
  });
};
//Obtener reservas del cliente (sin token)
const getClientReservations = (req, res) => {
  const clientId = req.user?.client_id;

  if (!clientId) {
    return res.status(401).json({ error: "No autorizado" });
  }

  Reservation.getClientReservations(clientId, (err, results) => {
    if (err) {
      console.error("Error obteniendo reservas del cliente:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    res.json(results);
  });
};
//Descargar archivo de reserva
const downloadReservationFile = (req, res) => {
  const reservationId = req.params.id;
  const field = req.params.field;

  const validFields = ["res_file_one", "res_file_two", "res_file_three"];
  if (!validFields.includes(field)) {
    return res.status(400).json({ error: "Campo de archivo no válido." });
  }

  const sql = `SELECT ?? FROM reservation WHERE res_id = ?`;
  connection.query(sql, [field, reservationId], (err, results) => {
    if (err) {
      console.error("Error en consulta:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    if (results.length === 0 || !results[0][field]) {
      return res
        .status(404)
        .json({ error: "Archivo no encontrado para esta reserva." });
    }

    const filename = results[0][field];
    const filePath = path.join(
      __dirname,
      "../../uploads/reservations",
      filename
    );

    if (!fs.existsSync(filePath)) {
      return res
        .status(404)
        .json({ error: "Archivo no encontrado en el servidor." });
    }

    res.download(filePath, filename);
  });
};

// Exportar funciones
module.exports = {
  getReservations,
  getReservationById,
  createReservation,
  createReservationForGuest,
  updateReservation,
  deleteReservation,
  getMyReservations,
  getClientReservations,
  updateReservationStatus,
  downloadReservationFile,
};
