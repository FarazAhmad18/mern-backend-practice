const express=require("express")
const app=express()
app.use(express.json())
//file upload third party
const fileUpload=require("express-fileupload")
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}))
require("dotenv").config()
//port
const port=process.env.PORT || 4000
//connecting db
require("./config/database").dbConnect()
//connecting cloudinary
require("./config/cloudinary").connectCloudinary()
app.listen(port,()=>{
    console.log(`Server started at port ${port}`)
})
const file=require("./routes/FileUpload")
app.use("/api/v1",file)

app.get("/",(req,res)=>{
    res.send("Welcome to home page of file handling")
})