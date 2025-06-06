const express = require("express");
const router = express.Router();
const { login, employeeLogin } = require("../controllers/auth.controller");

router.post("/login", login); // Ruta para iniciar sesión de cliente
router.post("/employee", employeeLogin); // Ruta para iniciar sesión de empleado

module.exports = router;
