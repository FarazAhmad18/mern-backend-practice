// // const express=require("express")
// // const app=express();

// // require("dotenv").config()
// // const {dbConnect}=require("./config/db")
// // dbConnect();

// // const port=process.env.PORT || 4000

// // app.listen(port,()=>{
// //     console.log(`server started sucessfully at ${port}`)
// // })
// // // middleware parse,import apis route mount api route (app.use)
// // app.use(express.json());
// // const blogRoutes=require("./routes/blog")
// // app.use("/api/v1",blogRoutes)
// // //default route (app.get)
// // app.get("/",(req,res)=>{
// // res.send("<h1>Home Page</h1>")
// // })


const express = require("express")
const app = express();

require("dotenv").config()
const {dbConnect} = require("./config/db")
dbConnect();

const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Routes
const blogRoutes = require("./routes/blog")
app.use("/api/v1", blogRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>")
});

// Start server
app.listen(port, () => {
    console.log(`server started successfully at ${port}`)
});



