const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // For unique SIC generation

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sic: { type: String, unique: true, default: () => uuidv4().slice(0, 8) }, // Auto-generate SIC
  email: { type: String, unique: true, required: true },
  profilePic: { type: String },
  semester: { type: Number, required: true },
  //marksId: { type: mongoose.Schema.Types.ObjectId, unique:true },
  attendanceId: { type: mongoose.Schema.Types.ObjectId, ref:"Attendance" },
  sgpa: { type: Number, default: 0 },
  cgpa: { type: Number, default: 0 },
  hasBacklogs: { type: Boolean, default: false },
});

// Middleware to auto-create marks and attendance records
// Middleware to auto-create marks and attendance records
/*studentSchema.pre("save", async function (next) {
  if (!this.marksId || !this.attendanceId) {
    const Marks = mongoose.model("Marks");
    const Attendance = mongoose.model("Attendance");

    if (!this.marksId) {
      const newMarks = await Marks.create({ student: this._id });
      this.marksId = newMarks._id;
    }

    if (!this.attendanceId) {
      const newAttendance = await Attendance.create({ student: this._id });
      this.attendanceId = newAttendance._id;
    }
  }

  next();
});*/

module.exports = mongoose.model("Student", studentSchema);
