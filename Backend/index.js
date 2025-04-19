const express=require('express')
const methodOverride = require('method-override');
const performanceRouter=require('./router/performance_router.js')
const admitCardRouter=require('./router/admitcard_router.js')
const path=require('path')
const dbConnect = require('./db.js')//importing db.js
const dotenv = require('dotenv')//importing env file
const userRouter=require('./router/student_router.js')
const marksRouter=require('./router/marks_router.js')
const attendanceRouter=require('./router/attendance_router.js')

dotenv.config()

const PORT=process.env.PORT||5000
const app=express()
// Method override must come before your routes
app.use(methodOverride('_method'));
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Define the views directory



app.use(express.json()) //middleware for using json data
app.use("/student_pfp",express.static(path.join(__dirname,"student_pfp")))
app.use(express.urlencoded({extended:true}))//The middleware app.use(express.urlencoded({ extended: true })) in an Express application is used to parse URL-encoded data from the body of incoming requests

app.use(performanceRouter)
app.use(admitCardRouter)
app.use(userRouter)
app.use(marksRouter)
app.use(attendanceRouter)



app.listen(PORT,()=>{
    console.log("server running at http://localhost:5000/")
    dbConnect();

})