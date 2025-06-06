const express = require("express");
const router = express.Router();
const guestController = require("../controllers/guest.controller");

// Endpoints básicos
router.get("/", guestController.getGuests);
router.get("/:id", guestController.getGuestById);
router.post("/", guestController.createGuest);
router.delete("/:id", guestController.deleteGuest);

module.exports = router;
