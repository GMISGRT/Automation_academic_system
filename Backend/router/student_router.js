//student_router.js
// because we need access to Express's Router functionality.
//Access to express.Router() helps in defining modular, mountable route handlers.
const express = require('express');
const {
    addStudent,
    allStudent,
    updateStudent,
    deleteStudent,
    getStudentbysic
}=require('../controller/student_controller.js')
const upload=require("../middleware/picupload.js")

const userRouter=express.Router()

userRouter.get('/all',allStudent)
userRouter.post('/addStudent',upload.single("profilePic"), addStudent);

userRouter.post('/deleteStudent/:sic',deleteStudent)
userRouter.post('/updateStudent/:sic',upload.single("profilePic"),updateStudent)//here put is not working post is 
userRouter.get('/getStudentbysic/:sic',getStudentbysic)


module.exports=userRouter