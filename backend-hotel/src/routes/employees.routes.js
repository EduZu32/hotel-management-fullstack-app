const express = require("express");
const router = express.Router();
const verifyToken = require("../../middlewares/verifyToken");
const verifyManager = require("../../middlewares/verifyManager");

const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  toggleEmployeeActive
} = require("../controllers/employees.controller");


router.put("/:id/toggle", verifyToken, verifyManager, toggleEmployeeActive);
router.get("/", verifyToken, verifyManager, getEmployees);
router.get("/:id", verifyToken, verifyManager, getEmployeeById);
router.post("/", verifyToken, verifyManager, createEmployee);
router.put("/:id", verifyToken, verifyManager, updateEmployee);
router.delete("/:id", verifyToken, verifyManager, deleteEmployee);

module.exports = router;
