const express = require("express");
const router = express.Router();
const shiftController = require("../controllers/shift.controller");
const {
  getShiftHistoryByEmployee,
} = require("../controllers/shift.controller");
const {
  getShiftSummaryAllEmployees,
} = require("../controllers/shift.controller");

router.get("/summary", getShiftSummaryAllEmployees);
router.get("/history/:emp_id", getShiftHistoryByEmployee);
router.post("/login/:id", shiftController.registerShiftIn);
router.put("/logout/:id", shiftController.registerShiftOut);

module.exports = router;
