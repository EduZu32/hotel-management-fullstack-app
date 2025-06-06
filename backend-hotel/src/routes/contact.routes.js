const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/send", (req, res) => {
  const { name, surname, email, subject, content } = req.body;

  if (!name || !surname || !email || !subject || !content) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  db.query(
    `INSERT INTO contact_messages (msg_name, msg_surname, msg_email, msg_subject, msg_content) VALUES (?, ?, ?, ?, ?)`,
    [name, surname, email, subject, content],
    (error, result) => {
      if (error) {
        console.error("❌ Error al guardar mensaje:", error);
        return res.status(500).json({ message: "Error del servidor" });
      }

      res.status(200).json({ message: "Mensaje guardado correctamente" });
    }
  );
});

module.exports = router;
