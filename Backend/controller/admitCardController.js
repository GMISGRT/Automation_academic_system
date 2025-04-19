const fs = require("fs");
const path = require("path");
const AdmitCard = require("../schema/admitcard_schema");
const Student = require("../schema/student_schema");
const Attendance = require("../schema/attendance_schema"); // Assuming attendance is stored in MongoDB


exports.getAdmitCards = async (req, res) => {
  try {
    console.log("1. Starting getAdmitCards");
    
    // 1. Fetch all students
    const students = await Student.find().lean();
    console.log(`2. Found ${students.length} students`);

    // 2. Fetch attendance data from MongoDB
    console.log("Fetching attendance records...");

    const attendanceRecords = await Attendance.find().lean();
    console.log("Loaded Attendance Data:", attendanceRecords);

    // 3. Create attendance lookup map
    // Corrected attendance map logic
const attendanceMap = new Map();
attendanceRecords.forEach(record => {
  attendanceMap.set(String(record.sic).toLowerCase(), record.attendance);
});
console.log("Attendance Map:", attendanceMap); // Debug log to check if map is populated

  
    
    // 4. Process students
    const eligibleStudents = [];
    const ineligibleStudents = [];

    students.forEach(student => {
      const studentAttendance = attendanceMap.get(String(student.sic).toLowerCase());
      
      if (!studentAttendance) {
        console.log(`- ${student.sic}: No attendance record`);
        ineligibleStudents.push({
          sic: student.sic,
          name: student.name,
          email: student.email,
          department: student.department,
          reason: "No attendance record found"
        });
        return;
      }

      // Check attendance percentages
      const lowAttendanceSubjects = Object.entries(studentAttendance)
        .filter(([_, percent]) => percent < 75)
        .map(([subject, percent]) => `${subject} (${percent}%)`);

      if (lowAttendanceSubjects.length > 0) {
        console.log(`- ${student.sic}: Low attendance in ${lowAttendanceSubjects.join(', ')}`);
        ineligibleStudents.push({
          sic: student.sic,
          name: student.name,
          email: student.email,
          department: student.department,
          reason: `Low attendance in: ${lowAttendanceSubjects.join(", ")}`
        });
      } else {
        eligibleStudents.push(student);
      }
    });

    // 5. Fetch admit cards for eligible students
    const admitCards = await AdmitCard.find({
      studentId: { $in: eligibleStudents.map(s => s._id) }
    }).populate("studentId", "name sic email department");

    // 6. Render template with results
    res.render("admitCards", {
      admitCards,
      eligibleStudents,
      ineligibleStudents,
      hasEligible: eligibleStudents.length > 0,
      hasIneligible: ineligibleStudents.length > 0
    });
  } catch (error) {
    console.error("Error in getAdmitCards:", error);
    res.status(500).render("error", {
      message: "Failed to load admit cards",
      error: error.message
    });
  }
};
