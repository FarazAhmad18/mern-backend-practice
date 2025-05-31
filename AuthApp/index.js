const express=require("express")
const app=express()
const cookieParser=require("cookie-parser")
require("dotenv").config();
const port=process.env.PORT || 4000
app.use(express.json())
app.use(cookieParser())
require("./config/database").dbConnect();
app.listen(
    port,()=>
        {console.log(`server started at port ${port}`)})
const user=require("./routes/user")
app.use("/api/v1", user)

app.get("/", (req, res) => {
  res.send("Welcome to the home!");
});