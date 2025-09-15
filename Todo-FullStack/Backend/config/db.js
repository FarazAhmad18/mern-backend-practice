const mongoose=require("mongoose")
require("dotenv").config()
exports.dbConnect=()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>console.log("DB connected sucessfully"))
    .catch((err)=>{
        console.log("error in connecting DB")
        console.error(err)
        process.exit(1)
    })

}