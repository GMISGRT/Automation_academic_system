const Attendance = require("../schema/attendance_schema.js");

// Get attendance records of all students
const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get attendance of a specific student by SIC
const getAttendanceBySIC = async (req, res) => {
  try {
    const attendance = await Attendance.findOne({ sic: req.params.sic });
    if (!attendance) return res.status(404).json({ message: "Attendance record not found" });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllAttendance,
  getAttendanceBySIC,
};
