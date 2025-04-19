const mongoose = require("mongoose");

const MarksSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true }, // Reference Student
  marksId: { type: mongoose.Schema.Types.ObjectId, ref:"Student", required:true},
  subjects: {
    "Compiler Design": Number,
    "Cloud Computing": Number,
    "Adv ML": Number,
    "Emerging Technology": Number,
    "Software Engineering": Number,
    "IoT": Number
  }
});

module.exports = mongoose.model("Marks", MarksSchema);
