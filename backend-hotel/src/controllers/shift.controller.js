const connection = require("../config/db");

// Registrar fin de turno
const registerShiftOut = (req, res) => {
  const emp_id = req.params.id;
  const now = new Date();

  const findLastOpenShift = `
    SELECT shift_id, shift_date_in
    FROM shift
    WHERE shift_emp_id = ? AND shift_date_out IS NULL
    ORDER BY shift_date_in DESC
    LIMIT 1
  `;

  connection.query(findLastOpenShift, [emp_id], (err, results) => {
    if (err) {
      console.error(" Error al buscar turno abierto:", err);
      return res.status(500).json({ error: "Error buscando turno abierto" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay turno abierto para cerrar" });
    }

    const { shift_id, shift_date_in } = results[0];
    const shiftInDate = new Date(shift_date_in);
    const diffMs = now.getTime() - shiftInDate.getTime();

    const totalSeconds = Math.floor(diffMs / 1000);
    const minutesWorked = totalSeconds / 60;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    const updateShift = `
      UPDATE shift
      SET shift_date_out = ?, hours_worked = ?
      WHERE shift_id = ?
    `;

    connection.query(
      updateShift,
      [now, minutesWorked, shift_id],
      (err, result) => {
        if (err) {
          console.error(" Error al actualizar turno:", err);
          return res.status(500).json({ error: "Error cerrando el turno" });
        }

        res.json({
          message: " Turno cerrado correctamente",
          worked: {
            hours,
            minutes,
            seconds,
            formatted: formattedTime,
            totalMinutes: minutesWorked.toFixed(2),
          },
        });
      }
    );
  });
};

// Registrar inicio de turno
const registerShiftIn = (req, res) => {
  const emp_id = req.params.id;
  const now = new Date();

  // Verificar si ya hay un turno abierto sin cerrar
  const checkOpenShift = `
    SELECT * FROM shift
    WHERE shift_emp_id = ? AND shift_date_out IS NULL
    LIMIT 1
  `;

  connection.query(checkOpenShift, [emp_id], (err, results) => {
    if (err) {
      console.error("Error verificando turno abierto:", err);
      return res.status(500).json({ error: "Error verificando turno" });
    }

    if (results.length > 0) {
      return res
        .status(400)
        .json({ message: "Ya existe un turno abierto para este empleado" });
    }

    // Insertar nuevo turno
    const insertShift = `
      INSERT INTO shift (shift_emp_id, shift_date_in)
      VALUES (?, ?)
    `;

    connection.query(insertShift, [emp_id, now], (err, result) => {
      if (err) {
        console.error("Error iniciando turno:", err);
        return res.status(500).json({ error: "Error iniciando turno" });
      }

      res.status(201).json({
        message: "Turno iniciado correctamente",
        shiftId: result.insertId,
      });
    });
  });
};

const getShiftHistoryByEmployee = (req, res) => {
  const emp_id = req.params.emp_id;
  const { from, to } = req.query;

  let query = `
    SELECT shift_id, shift_date_in, shift_date_out, hours_worked
    FROM shift
    WHERE shift_emp_id = ?
      AND shift_date_out IS NOT NULL
  `;
  const params = [emp_id];

  if (from) {
    query += " AND DATE(shift_date_in) >= ?";
    params.push(from);
  }

  if (to) {
    query += " AND DATE(shift_date_in) <= ?";
    params.push(to);
  }

  query += " ORDER BY shift_date_in DESC";

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error("Error obteniendo historial de turnos:", err);
      return res.status(500).json({ error: "Error obteniendo historial" });
    }

    let totalMinutes = 0;

    const shifts = results.map((shift) => {
      const start = new Date(shift.shift_date_in);
      const end = new Date(shift.shift_date_out);

      const totalSeconds = Math.floor((end - start) / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const minutesWorked = parseFloat(shift.hours_worked) || 0;
      totalMinutes += minutesWorked;

      return {
        shift_id: shift.shift_id,
        date: start.toISOString().split("T")[0],
        start: start.toTimeString().split(" ")[0],
        end: end.toTimeString().split(" ")[0],
        duration: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`,
        minutes: minutesWorked.toFixed(2),
      };
    });

    const totalHours = Math.floor(totalMinutes / 60);
    const totalOnlyMinutes = Math.round(totalMinutes % 60);

    res.json({
      shifts,
      total: {
        minutes: totalMinutes.toFixed(2),
        hours: totalHours,
        minutesOnly: totalOnlyMinutes,
      },
    });
  });
};
const getShiftSummaryAllEmployees = (req, res) => {
  const { from, to } = req.query;

  let query = `
    SELECT 
  e.emp_id,
  e.emp_email,
  e.emp_role,
  e.emp_active,
  CONCAT(e.emp_name, ' ', e.emp_surname_one, ' ', IFNULL(e.emp_surname_two, '')) AS full_name,
  COUNT(s.shift_id) AS shift_count,
  IFNULL(SUM(s.hours_worked), 0) AS total_minutes
FROM employee e
LEFT JOIN shift s ON s.shift_emp_id = e.emp_id AND s.shift_date_out IS NOT NULL
  `;
  const params = [];

  if (from || to) {
    query += " WHERE";
    const filters = [];

    if (from) {
      filters.push(" DATE(s.shift_date_in) >= ? ");
      params.push(from);
    }

    if (to) {
      filters.push(" DATE(s.shift_date_in) <= ? ");
      params.push(to);
    }

    query += filters.join(" AND ");
  }

  query += `
    GROUP BY e.emp_id
    ORDER BY e.emp_name ASC
  `;

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error("Error obteniendo resumen de turnos:", err);
      return res.status(500).json({ error: "Error obteniendo resumen" });
    }

    const formatted = results.map((emp) => {
      const totalMinutes = parseFloat(emp.total_minutes) || 0;
      const hours = Math.floor(totalMinutes / 60);
      const minutesOnly = Math.round(totalMinutes % 60);

      return {
        emp_id: emp.emp_id,
        full_name: emp.full_name,
        emp_email: emp.emp_email,
        emp_role: emp.emp_role,
        emp_active: emp.emp_active,
        shift_count: emp.shift_count,
        total_minutes: totalMinutes.toFixed(2),
        hours,
        minutesOnly,
      };
    });

    res.json(formatted);
  });
};

module.exports = {
  registerShiftOut,
  registerShiftIn,
  getShiftHistoryByEmployee,
  getShiftSummaryAllEmployees,
};
