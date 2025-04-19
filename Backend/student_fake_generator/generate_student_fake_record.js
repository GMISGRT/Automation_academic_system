const { faker } = require("@faker-js/faker");
const fs = require("fs");

// Function to generate a fake 10-digit Indian phone number
function generateIndianPhoneNumber() {
  return `+91 ${faker.number.int({ min: 1000000000, max: 9999999999 }).toString()}`;
}

// List of common Indian names for more realistic results
const indianFirstNames = [
  "Aarav", "Ananya", "Rohan", "Sanya", "Ishaan", "Priya", "Aditya", "Kavya", "Neha", "Rahul",
  "Akash", "Alok", "Arjun", "Bhavesh", "Chandan", "Deepak", "Devansh", "Gautam", "Harsh", "Kunal",
  "Manish", "Nishant", "Pranav", "Rajat", "Sanjay", "Siddharth", "Suresh", "Tarun", "Uday", "Vijay",
  "Aditi", "Anusha", "Bhavana", "Chitra", "Deepika", "Divya", "Esha", "Gayatri", "Hema", "Ishita",
  "Jaya", "Kavitha", "Mansi", "Meera", "Nidhi", "Pooja", "Rachna", "Shilpa", "Sneha", "Tanvi",
  "Ritika", "Sumit", "Sakshi", "Naveen", "Ravi", "Harini", "Vishal", "Meghna", "Ramesh", "Swati"
];

const indianLastNames = [
  "Sharma", "Verma", "Iyer", "Patel", "Reddy", "Singh", "Nair", "Das", "Choudhury", "Ghosh",
  "Agarwal", "Bansal", "Bhattacharya", "Chatterjee", "Chopra", "Deshmukh", "Dutta", "Goswami", "Iyer", "Joshi",
  "Kapoor", "Kashyap", "Khanna", "Kulkarni", "Mehta", "Mishra", "Mukherjee", "Nambiar", "Narayan", "Pandey",
  "Pillai", "Rao", "Sahu", "Saxena", "Shetty", "Srivastava", "Thakur", "Tripathi", "Venkatesh", "Yadav"
];

// Function to generate a fake Indian email
function generateIndianEmail(firstName, lastName) {
  const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${faker.helpers.arrayElement(domains)}`;
}

// Function to generate a fake Indian address
function generateIndianAddress() {
  const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow"];
  return `${faker.location.streetAddress()}, ${faker.helpers.arrayElement(cities)}, India`;
}

// Function to generate a fake address in Bhubaneswar
function generateBbsrAddress() {
  const areasInBbsr = ["Saheed Nagar", "Patia", "Rasulgarh", "Jayadev Vihar", "Khandagiri", "Nayapalli", "Acharya Vihar", "Bapuji Nagar", "Laxmisagar", "Mancheswar"];
  return `${faker.location.streetAddress()}, ${faker.helpers.arrayElement(areasInBbsr)}, Bhubaneswar, India`;
}

// Function to generate a single student record
function generateStudent(studentNumber) {
  const firstName = faker.helpers.arrayElement(indianFirstNames);
  const lastName = faker.helpers.arrayElement(indianLastNames);
  const enrollmentYear = faker.number.int({ min: 2019, max: 2023 });
  const birthYear = enrollmentYear - faker.number.int({ min: 18, max: 21 }); // Aligning age with enrollment
  
  return {
    name: `${firstName} ${lastName}`,
    profile_image: `student_pfp/student(${studentNumber}).jpeg`,
    course: faker.helpers.arrayElement(["B-Tech"]),
    branch: faker.helpers.arrayElement(["CS", "ECE", "EEE", "MECHANICAL","CIVIL"]),
    dob: `${birthYear}-${faker.number.int({ min: 1, max: 12 }).toString().padStart(2, "0")}-${faker.number.int({ min: 1, max: 28 }).toString().padStart(2, "0")}`,
    gender: faker.helpers.arrayElement(["Male", "Female"]),
    enrollment_year: enrollmentYear,
    "10th_marks": faker.number.int({ min: 75, max: 95 }),
    "12th_marks": faker.number.int({ min: 75, max: 95 }),
    phone_no: generateIndianPhoneNumber(),
    email: generateIndianEmail(firstName, lastName),
    father_name: `${faker.helpers.arrayElement(indianFirstNames)} ${faker.helpers.arrayElement(indianLastNames)}`,
    mother_name: `${faker.helpers.arrayElement(indianFirstNames)} ${faker.helpers.arrayElement(indianLastNames)}`,
    parents_contact_no: generateIndianPhoneNumber(),
    home_address: generateIndianAddress(),
    local_guardian_name: `${faker.helpers.arrayElement(indianFirstNames)} ${faker.helpers.arrayElement(indianLastNames)}`,
    local_guardian_contact: generateIndianPhoneNumber(),
    local_guardian_address: generateBbsrAddress(),
    cgpa: faker.number.float({ min: 6.0, max: 10.0, precision: 0.01 }).toFixed(2),
  };
}

// Generate 76 student records
const students = Array.from({ length: 76 }, (_, i) => generateStudent(i + 1));

// Save the records to a JSON file
fs.writeFileSync("student.json", JSON.stringify(students, null, 2));

console.log("student.json file with 76 records has been generated!");
