const bcrypt = require("bcrypt"); // Importamos bcrypt para hashear la contraseña
const connection = require("../config/db");
// Importamos la conexión a la base de datos
const deleteClient = (req, res) => {
  const clientId = req.params.id;

  // Paso 1: Borrar cuenta asociada al cliente
  const deleteAccountSQL = "DELETE FROM account WHERE account_client_id = ?";
  connection.query(deleteAccountSQL, [clientId], (err) => {
    if (err) {
      console.error("Error deleting account:", err);
      return res.status(500).json({ error: "Error deleting account" });
    }

    // Paso 2: Borrar cliente
    const deleteClientSQL = "DELETE FROM client WHERE client_id = ?";
    connection.query(deleteClientSQL, [clientId], (err, results) => {
      if (err) {
        console.error("Error deleting client:", err);
        return res.status(500).json({ error: "Error deleting client" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Client not found" });
      }

      return res.json({ message: "Client and account successfully deleted" });
    });
  });
};
// Actualizar un cliente
const updateClient = (req, res) => {
  const clientId = req.params.id;
  const {
    client_doc_type,
    client_doc_id,
    client_name,
    client_surname_one,
    client_surname_two,
    client_telephone,
    client_email,
  } = req.body;

  // Validar al menos un campo para actualizar
  if (
    !client_doc_type &&
    !client_doc_id &&
    !client_name &&
    !client_surname_one &&
    !client_surname_two &&
    !client_telephone &&
    !client_email
  ) {
    return res.status(400).json({ error: "No hay datos para actualizar" });
  }

  let fields = [];
  let values = [];

  if (client_doc_type !== undefined) {
    fields.push("client_doc_type = ?");
    values.push(client_doc_type);
  }
  if (client_doc_id !== undefined) {
    fields.push("client_doc_id = ?");
    values.push(client_doc_id);
  }
  if (client_name !== undefined) {
    fields.push("client_name = ?");
    values.push(client_name);
  }
  if (client_surname_one !== undefined) {
    fields.push("client_surname_one = ?");
    values.push(client_surname_one);
  }
  if (client_surname_two !== undefined) {
    fields.push("client_surname_two = ?");
    values.push(client_surname_two);
  }
  if (client_telephone !== undefined) {
    fields.push("client_telephone = ?");
    values.push(client_telephone);
  }
  if (client_email !== undefined) {
    fields.push("client_email = ?");
    values.push(client_email);
  }

  const sql = `UPDATE client SET ${fields.join(", ")} WHERE client_id = ?`;
  values.push(clientId);

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error updating client:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Client not found" });
    }
    return res.json({ message: "Cliente actualizado correctamente" });
  });
};
// Obtener todos los clientes
const getClients = (req, res) => {
  connection.query("SELECT * FROM client", (err, results) => {
    if (err) {
      console.error("Error fetching clients:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
};
// Obtener un cliente por ID
const getClientById = (req, res) => {
  const clientId = req.params.id;

  const sql = "SELECT * FROM client WHERE client_id = ?";
  connection.query(sql, [clientId], (err, results) => {
    if (err) {
      console.error("Error fetching client:", err);
      res.status(500).json({ error: "Internal server error" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "Client not found" });
    } else {
      res.json(results[0]);
    }
  });
};

// Crear un nuevo cliente y su cuenta asociada
const createClient = async (req, res) => {
  const {
    client_name,
    client_surname_one,
    client_surname_two,
    client_telephone,
    client_email,
    password,
  } = req.body;

  if (
    !client_name ||
    !client_surname_one ||
    !client_telephone ||
    !client_email ||
    !password
  ) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  try {
    //Validar si el email ya existe
    const [emailRows] = await connection
      .promise()
      .query("SELECT client_id FROM client WHERE client_email = ?", [
        client_email,
      ]);

    if (emailRows.length > 0) {
      return res.status(409).json({ error: "Este correo ya está registrado" });
    }

    //Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    //Insertar cliente
    const [clientResult] = await connection
      .promise()
      .query(
        "INSERT INTO client (client_name, client_surname_one, client_surname_two, client_telephone, client_email) VALUES (?, ?, ?, ?, ?)",
        [
          client_name,
          client_surname_one,
          client_surname_two || "",
          client_telephone,
          client_email,
        ]
      );

    const clientId = clientResult.insertId;

    //Insertar cuenta asociada
    await connection
      .promise()
      .query(
        "INSERT INTO account (account_client_id, account_passwd, account_points) VALUES (?, ?, ?)",
        [clientId, hashedPassword, 0]
      );

    return res
      .status(201)
      .json({ message: "Cliente y cuenta creados con éxito" });
  } catch (err) {
    console.error("Error en el registro:", err);

    const msg = err.sqlMessage?.toLowerCase() || "";

    if (err.code === "ER_DUP_ENTRY") {
      if (msg.includes("client_email")) {
        return res
          .status(409)
          .json({ error: "Este correo ya está registrado" });
      }
      if (msg.includes("account_client_id")) {
        return res
          .status(409)
          .json({ error: "Este cliente ya tiene una cuenta" });
      }

      return res.status(409).json({ error: "Valor duplicado" });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

const getClientProfile = (req, res) => {
  const clientId = req.user?.client_id;

  if (!clientId) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }

  const sql = `
    SELECT 
      c.client_id, 
      c.client_name, 
      c.client_email, 
      a.account_points 
    FROM client c
    JOIN account a ON c.client_id = a.account_client_id
    WHERE c.client_id = ?
  `;

  connection.query(sql, [clientId], (err, results) => {
    if (err) {
      console.error("Error obteniendo perfil del cliente:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json(results[0]);
  });
};

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClientProfile,
};
