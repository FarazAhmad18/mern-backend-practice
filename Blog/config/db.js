const mongoose=require("mongoose")

require("dotenv").config()
 exports.dbConnect=()=>
{
    mongoose.connect(process.env.DB_URL)
    .then(()=>console.log("DB connection sucessfull"))
    .catch((error)=>{
        console.log("Error in connecting")
        console.error(error)
        process.exit(1)
    })
}
