const multer = require("multer")
const path = require("path")
const fs=require("fs")

const storage=multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../student_pfp"));
    },
    filename: function (req, file, cb) {
        // Upload with a temporary name first
        const tempName = "temp_" + Date.now() + path.extname(file.originalname);
        cb(null, tempName);
    }
    /*destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../student_pfp"))
    },
    filename:function(req,file,cb){
        const sic=req.body.sic
        //extracting only the number part from sic
        const numberPartMatch = sic.match(/\d+/);
        const numberPart = numberPartMatch ? parseInt(numberPartMatch[0]) : 0;// Extract only the numeric part(sic001-->001)

         
        const ext = path.extname(file.originalname); //getting its external .jpg/.jpeg
        //renaming the file
        const newFileName=`student(${parseInt(numberPart)})${ext}`;//renaming it to according to sic(parseint removes 001-->1) so name student(1).jpeg
        const filePath = path.join(__dirname, "../public/student_pfp", newFileName);
        
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // ✅ Safely remove old file
            }
        } catch (err) {
            console.error("Error deleting file:", err.message);
        }


        cb(null, newFileName); // Save new file with the same name
        
    }*/
})
const upload = multer({ storage: storage });

module.exports = upload;


