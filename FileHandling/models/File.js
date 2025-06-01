const mongoose=require("mongoose")
const nodemailer=require("nodemailer")
require("dotenv").config()
const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    tags:{
        type:String,
    },
    imgUrl:{
        type:String
    }
});
fileSchema.post("save",async function(doc){
    try{
        console.log("Doc",doc)
        const transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            } 
        })
        let info=await transporter.sendMail(
            {
                from:`Faraz Ahmad`,
                to:doc.email,
                subject:"New File Uploaded on cludinary",
                html:`<h1>You have successfully uploaded file on Cloudinary</h1> <a href="${doc.imgUrl}">View File</a>`
            }
        )
        console.log("info",info)
    }
    catch(error){
        console.log(error)
    }
}
)
const File=mongoose.model("File",fileSchema);
module.exports=File