const mongoose=require("mongoose")
const todoSchema=new mongoose.Schema
({
    title:{
        type:String,
        required:true,
        maxLength:50
    },
    description:{
type:String,
required:true,
maxLength:50
    },
    createdAt:{
type:Date,
required:true,
default:Date.now
    },
    updatedAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})

module.exports=mongoose.model("Todo",todoSchema);


// const mongoose = require("mongoose");

// // console.log("✅ Checkpoint 9: Todo model loaded");

// const todoSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//         maxLength: 50,
//     },
//     description: {
//         type: String,
//         required: true,
//         maxLength: 50,
//     },
//     createdAt: {
//         type: Date,
//         required: true,
//         default: Date.now, // ❗ Corrected: use Date.now (not Date.now())
//     },
//     updatedAt: {
//         type: Date,
//         required: true,
//         default: Date.now,
//     }
// });

// module.exports = mongoose.model("Todo", todoSchema);
