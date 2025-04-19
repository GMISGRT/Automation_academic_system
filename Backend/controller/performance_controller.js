// studentController.js
const Student = require('../schema/student_schema');
const marks = require('../schema/marks_schema');
const { processStudentPerformance } = require('../student_performance.js');

const getPerformanceReports = async (req, res) => {
  try {
    const students = await Student.find();
    const performanceData =await processStudentPerformance(students);
    
    // Separate into different reports
    const rankList = [...performanceData].sort((a, b) => a.rank - b.rank);
    const failedStudents = performanceData.filter(s => s.backPapers.length > 0);
    
    res.render('performanceReports.ejs', {
      rankList,
      failedStudents
    });
    
  } catch (error) {
    console.error('Controller error:', error);
    
  }
};

const test = async () => {
    try {
      const students = await Student.find().limit(3).exec();
      const results = await processStudentPerformance(students);
      console.log("Test results:", results);
    } catch (err) {
      console.error("Test failed:", err);
    }
  };
  test();

module.exports={getPerformanceReports}