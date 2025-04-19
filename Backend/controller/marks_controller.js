const Marks = require("../schema/marks_schema.js");

// Get marks of all students


const getAllMarks = async (req, res) => {
  try {
    const marks = await Marks.find();
    res.json(marks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get marks of a specific student by SIC
const getMarksBySIC = async (req, res) => {
  try {
    const marks = await Marks.findOne({ sic: req.params.sic });
    if (!marks) return res.status(404).json({ message: "Marks not found" });
    res.json(marks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllMarks,
  getMarksBySIC,
};
