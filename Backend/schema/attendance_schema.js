const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Using attendanceId as _id
  sic: { type: String, required: true, index: true },
  name: String,
  attendance: {
    type: Map,
    of: Number,
    required: true
  }
}, { 
  timestamps: true,
  // Disable automatic _id generation since we're using attendanceId
  _id: false 
});

module.exports = mongoose.model('Attendance', attendanceSchema,"attendance");