const express=require("express")
const app=express()
const cors=require("cors")
app.use(express.json())
app.use(cors({ 
  origin: 'http://localhost:5173', 
  credentials: true 
}));
require("dotenv").config()

require("./config/db").dbConnect()
const port=process.env.PORT || 4000
const todoRoutes=require("./routes/crud")
app.use("/api/todo",todoRoutes)
app.listen(port,()=>{
console.log(`Server started at port ${port}`)
})
app.get('/',(req,res)=>{
    res.send("API is running")
})