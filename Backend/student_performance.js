const Student = require('./schema/student_schema.js');
const Marks = require('./schema/marks_schema.js');

// Grading policy configuration
const GRADING_SCALE = {
  A: { min: 90, point: 10 },
  B: { min: 80, point: 9 },
  C: { min: 70, point: 8 },
  D: { min: 60, point: 7 },
  E: { min: 50, point: 6 },
  F: { min: 40, point: 5 },
  FAIL: { min: 0, point: 0 }
};

const PASSING_MARKS = 40;
const DEFAULT_CREDITS = 4;

function calculateGradePoint(marks) {
  marks = Number(marks); // Ensure marks is a number
  for (const [grade, criteria] of Object.entries(GRADING_SCALE)) {
    if (marks >= criteria.min) return criteria.point;
  }
  return 0;
}

function processMarksObject(marksObj) {
  if (!marksObj || typeof marksObj !== 'object') {
    console.error('Invalid marks object:', marksObj);
    return [];
  }
  
  return Object.entries(marksObj).map(([name, marks]) => ({
    name,
    marks: Number(marks),
    credits: DEFAULT_CREDITS
  }));
}

function calculateSGPA(marksObj) {
  console.log("Raw marks received:", marksObj);
  
  const subjects = processMarksObject(marksObj);
  console.log("Processed subjects:", subjects);

  const totalCredits = subjects.reduce((sum, sub) => sum + sub.credits, 0);
  console.log("Total credits:", totalCredits);
  
  if (totalCredits === 0) return 0;
  
  const totalPoints = subjects.reduce((sum, sub) => {
    const gradePoint = calculateGradePoint(sub.marks);
    console.log(`Subject: ${sub.name}, Marks: ${sub.marks}, Grade Point: ${gradePoint}`);
    return sum + (gradePoint * sub.credits);
  }, 0);

  console.log("Total points:", totalPoints);
  
  const sgpa = parseFloat((totalPoints / totalCredits).toFixed(2));
  console.log("Calculated SGPA:", sgpa);
  
  return sgpa;
}

function getBackPapers(marksObj) {
  const subjects = processMarksObject(marksObj);
  return subjects
    .filter(sub => sub.marks < PASSING_MARKS)
    .map(sub => ({
      name: sub.name,
      marks: sub.marks,
      credits: sub.credits
    }));
}

async function processStudentPerformance(students) {
  try {
    console.log("Starting performance processing...");
    console.log("Fetching marks records...");
    
    const marksRecords = await Marks.find().lean().exec();
    console.log(`Found ${marksRecords.length} marks records`);
    
    if (!Array.isArray(students)) {
      throw new Error("Students data must be an array");
    }

    console.log(`Processing ${students.length} students...`);
    
    const processed = students.map(student => {
      console.log(`Processing student ${student.sic}`);
      
      const studentMarks = marksRecords.find(m => 
        m && (m.sic === student.sic || m.marksId === student.marksId)
      );
      
      if (!studentMarks || !studentMarks.marks) {
        console.warn(`No marks found for student ${student.sic}`);
        return {
          ...student.toObject(),
          sgpa: 0,
          backPapers: [],
          error: "Marks data not found"
        };
      }

      console.log(`Calculating SGPA for ${student.sic}...`);
      const sgpa = calculateSGPA(studentMarks.marks);
      const backPapers = getBackPapers(studentMarks.marks);
      
      console.log(`Student ${student.sic} - SGPA: ${sgpa}, Back Papers: ${backPapers.length}`);
      
      return {
        ...student.toObject(),
        name: student.name,
        sic: student.sic,
        sgpa,
        backPapers
      };
    });
    
    console.log("Sorting students by SGPA...");
    const rankedStudents = processed
      .sort((a, b) => b.sgpa - a.sgpa)
      .map((student, index) => ({
        ...student,
        rank: index + 1
      }));
    
    console.log("Performance processing completed successfully");
    return rankedStudents;
      
  } catch (error) {
    console.error('Error in processStudentPerformance:', error);
    throw error;
  }
}

module.exports = {
  processStudentPerformance
};