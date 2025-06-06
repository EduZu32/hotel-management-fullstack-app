const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservations.controller");
const verifyToken = require("../../middlewares/verifyToken");
const verifyManager = require("../../middlewares/verifyManager");
const upload = require("../../middlewares/upload.middleware");
const path = require("path");
const fs = require("fs");

// Middleware para servir archivos estáticos de la carpeta "uploads"
router.get("/:id/download/:field", verifyToken, reservationController.downloadReservationFile);


//Reservas para empleados autenticados
router.get("/", verifyToken, reservationController.getReservations);
router.get("/:id", verifyToken, reservationController.getReservationById);
router.put(
  "/:id",
  verifyToken,
  verifyManager,
  reservationController.updateReservation
);
router.delete(
  "/:id",
  verifyToken,
  verifyManager,
  reservationController.deleteReservation
);
router.put(
  "/:id/status",
  verifyToken,
  upload.fields([
    { name: "res_file_one", maxCount: 1 },
    { name: "res_file_two", maxCount: 1 },
    { name: "res_file_three", maxCount: 1 },
  ]),
  reservationController.updateReservationStatus
);

//Cliente autenticado: crear y ver sus reservas
router.post("/client", verifyToken, reservationController.createReservation);
router.get(
  "/client/my-reservations",
  verifyToken,
  reservationController.getMyReservations
);

//Crear reserva como invitado (sin cuenta)
router.post("/guest", reservationController.createReservationForGuest);

module.exports = router;
