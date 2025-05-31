const mongoose=require("mongoose");

require("dotenv").config()
const dbConnect=()=>
{
mongoose.connect(process.env.DATABASE_URL)
.then(()=>console.log("Db Connection Successful"))
.catch((error)=>{
    console.log("Problem in connecting")
    console.error(error.message)
    process.exit(1)
})
}

module.exports=dbConnect

// const mongoose = require("mongoose");

// const dbConnect = () => {
//     const uri = process.env.DATABASE_URL;

//     if (!uri) {
//         console.error("❌ DATABASE_URL is undefined!");
//         process.exit(1);
//     }

//     mongoose.connect(uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => console.log("✅ Checkpoint 3: DB Connection Successful"))
//     .catch((error) => {
//         console.log("❌ Checkpoint 3 Failed: DB Connection Error");
//         console.error(error.message);
//         process.exit(1);
//     });
// };

// module.exports = dbConnect;
