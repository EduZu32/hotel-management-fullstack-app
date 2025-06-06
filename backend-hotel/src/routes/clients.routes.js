const express = require("express");
const router = express.Router();
const verifyToken = require("../../middlewares/verifyToken");
const clientController = require("../controllers/clients.controller");

// Nueva ruta protegida
router.get("/me", verifyToken, clientController.getClientProfile);

router.get("/", clientController.getClients);
router.get("/:id", clientController.getClientById);
router.post("/", clientController.createClient);
router.put("/:id", clientController.updateClient);
router.delete("/:id", clientController.deleteClient);

module.exports = router;
