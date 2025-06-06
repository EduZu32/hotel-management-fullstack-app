const Guest = require("../models/guest.model");

// Obtener todos los invitados
const getGuests = (req, res) => {
  Guest.getAll((err, results) => {
    if (err) {
      console.error("Error al obtener invitados:", err);
      return res.status(500).json({ error: "Error al obtener invitados" });
    }
    res.json(results);
  });
};

// Obtener invitado por ID
const getGuestById = (req, res) => {
  const { id } = req.params;

  Guest.getById(id, (err, results) => {
    if (err) {
      console.error("Error al obtener invitado:", err);
      return res.status(500).json({ error: "Error al obtener invitado" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Invitado no encontrado" });
    }
    res.json(results[0]);
  });
};

//Crear invitado manualmente (opcional)
const createGuest = (req, res) => {
  const {
    guest_name,
    guest_lastname,
    guest_email,
    guest_phone,
    guest_preferences,
  } = req.body;

  if (!guest_name || !guest_lastname) {
    return res.status(400).json({ error: "Nombre y apellidos obligatorios" });
  }

  const newGuest = {
    guest_name,
    guest_lastname,
    guest_email,
    guest_phone,
    guest_preferences,
  };

  Guest.create(newGuest, (err, result) => {
    if (err) {
      console.error("Error al crear invitado:", err);
      return res.status(500).json({ error: "Error al crear invitado" });
    }

    res.status(201).json({
      message: "Invitado creado correctamente",
      guestId: result.insertId,
    });
  });
};

// Eliminar invitado
const deleteGuest = (req, res) => {
  const { id } = req.params;

  Guest.delete(id, (err) => {
    if (err) {
      console.error("Error al eliminar invitado:", err);
      return res.status(500).json({ error: "Error al eliminar invitado" });
    }

    res.json({ message: "Invitado eliminado correctamente" });
  });
};

module.exports = {
  getGuests,
  getGuestById,
  createGuest,
  deleteGuest,
};
