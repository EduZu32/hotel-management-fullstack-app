const express = require("express");
const router = express.Router();
const RoomController = require("../controllers/rooms.controller");
const verifyToken = require("../../middlewares/verifyToken");
const verifyManager = require("../../middlewares/verifyManager");

//Ruta de búsqueda de habitaciones
router.get("/search", RoomController.searchRooms);
// Obtener los tipos de habitación desde type_room
router.get("/types", RoomController.getRoomTypes);

//Habilitar y deshabilitar habitaciones
router.get("/enabled", verifyToken, RoomController.getEnabledRooms);
router.get("/disabled", verifyToken, RoomController.getDisabledRooms);

// Rutas CRUD normales
router.get("/", RoomController.getRooms);
router.get("/:id", RoomController.getRoomById);
router.post("/", verifyToken, verifyManager, RoomController.createRoom);
router.put("/:id", verifyToken, verifyManager, RoomController.updateRoom);
router.delete("/:id", verifyToken, verifyManager, RoomController.deleteRoom);

//Habilitar y deshabilitar habitación
router.put(
  "/:id/enable",
  verifyToken,
  verifyManager,
  RoomController.enableRoom
);
router.put(
  "/:id/disable",
  verifyToken,
  verifyManager,
  RoomController.disableRoom
);

//Modificar precio de tipo de habitación
router.put(
  "/room-types/:type",
  verifyToken, // solo autenticación, sin filtrar por rol manager o satff
  RoomController.updateRoomPrice
);

module.exports = router;
