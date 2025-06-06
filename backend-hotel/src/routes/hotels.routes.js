const express = require("express");
const router = express.Router();
const HotelController = require("../controllers/hotels.controller");

// Quita "/hotels", ya que en server.js ya usas "/api/hotels"
router.get("/", HotelController.getHotels);
router.get("/:id", HotelController.getHotelById);
router.post("/", HotelController.createHotel);
router.put("/:id", HotelController.updateHotel);
router.delete("/:id", HotelController.deleteHotel);

module.exports = router;
