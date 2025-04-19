const express = require("express");
const router = express.Router();
const { getAllMarks, getMarksBySIC } = require("../controller/marks_controller.js");

// Route to get all students' marks
router.get("/marks", getAllMarks);

// Route to get marks of a specific student by SIC
router.get("/marks/:sic", getMarksBySIC);

module.exports = router;
