//db.js
const mongoose=require('mongoose')
require('dotenv').config()//loading environment variable

async function dbConnect(){
    const DB_URL=process.env.DB_URL
    const DB_NAME=process.env.DB_NAME

    try{
        await mongoose.connect(`${DB_URL}/${DB_NAME}`)
        console.log("database connected")
    }
    catch(error){
        throw error
    }
}

module.exports=dbConnect