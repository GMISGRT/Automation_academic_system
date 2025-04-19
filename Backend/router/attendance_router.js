const express = require("express");
const router = express.Router();
const { getAllAttendance, getAttendanceBySIC } = require("../controller/attendance_controller.js");

// Route to get all students' attendance
router.get("/attendance", getAllAttendance);

// Route to get attendance of a specific student by SIC
router.get("/attendance/:sic", getAttendanceBySIC);

module.exports = router;
