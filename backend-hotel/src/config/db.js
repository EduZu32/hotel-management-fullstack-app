require("dotenv").config(); // Cargar variables de entorno desde .env donde se guardan los datos de conexión a la base de datos
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect((error) => {
  if (error) {
    console.error("Error, Connected MySQL:", error);
    return;
  }
  console.log("MySQL Connected Successfully");
});

module.exports = connection;
