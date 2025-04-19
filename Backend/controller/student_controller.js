//controller.js
//importing the schema
const Student=require('../schema/student_schema.js')
const path = require("path");
const fs = require("fs")
//schema has create,delete,find,findOne,findOneAndUpdate fxn
async function addStudent(req,res){
    try{
    let {name,email,semester}=req.body
    //generating sic automatically
    const lastStudent=await Student.findOne().sort({sic:-1})
    let newsic=lastStudent? parseInt(lastStudent.sic.match(/\d+/)[0])+1:1;
    const sic=`SIC${String(newsic).padStart(3,"0")}`

    //// 2️⃣ Process profile picture (if uploaded) and rename it
    if(req.file){
        const ext = path.extname(req.file.originalname); //getting its external .jpg/.jpeg
        //renaming the file
        const newFileName=`student(${newsic})${ext}`;//renaming it to according to sic(parseint removes 001-->1) so name student(1).jpeg
        const oldPath=path.join(__dirname,"../student_pfp",req.file.filename)
        const newPath=path.join(__dirname,"../student_pfp",newFileName)

        // Rename temp file to final SIC-based name

        fs.renameSync(oldPath,newPath)
        profilePic=`http://localhost:5000/student_pfp/${newFileName}`
    }

    let newstudent=new Student({name,email,semester,sic,profilePic})
    await newstudent.save()
    res.redirect('/all');
    //res.status(201).send(newstudent)

    }
    catch(error){
        res.status(404).send({"message":error.message})
    }

}
async function allStudent(req,res){
    try{
        let students= await  Student.find()//using dbms fxns find,create 
        console.log(students)
        res.render("students", { students });//#imp ejs file can automatically fetch fromthis students but name should be same of ejs file 
        //res.send(students)//sending students in the mongodb model

    }
    catch(error)
    {
        res.status(404).send({"message": error.message})
    }
}
async function getStudentbysic(req,res){
    try{
        let students= await Student.findOne({sic:req.params.sic})//using dbms fxns find,create
        if (!student) return res.status(404).json({ message: "Student not found" });
    
  
        console.log(students)
        res.status(200).json(students)//sending students in the mongodb model

    }
    catch(error)
    {
        res.status(404).send({"message": error.message})
    }
}
async function deleteStudent(req,res){
    try{
    //let id=req.params //req.params is an object so a variable is not right to store it we need another object data type
    let { sic }=req.params
    let student=await Student.findOneAndDelete({sic:sic})
    res.redirect("/all")
    }

    catch(error){
        res.status(404).send({"message":error.message})
    }

}
async function updateStudent(req,res){
    try{
    let { sic }=req.params
    const { name, email, semester } = req.body;
        
    const updateData = { name, email, semester };
    console.log("SIC parameter:", sic);
    console.log("Update data:", req.body);
    if (req.file) {
        const ext = path.extname(req.file.originalname);
        const newFileName = `student(${sic.slice(3)})${ext}`;
        const oldPath = path.join(__dirname, "../student_pfp", req.file.filename);
        const newPath = path.join(__dirname, "../student_pfp", newFileName);

        fs.renameSync(oldPath, newPath);
        updateData.profilePic = `http://localhost:5000/student_pfp/${newFileName}`;
    }

    let student=await Student.findOneAndUpdate(
        {sic:sic}, { $set: updateData }, { new: true, runValidators: true } )
        res.redirect('/all');
        //res.status(200).send(student)
}
    catch(error){
        res.status(404).send({"message":error.message})
    }

}

module.exports={
    addStudent,
    deleteStudent,
    updateStudent,
    allStudent,
    getStudentbysic
}