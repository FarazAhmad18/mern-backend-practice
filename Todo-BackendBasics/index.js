const express = require('express')
const app = express()

// Load environment variables FIRST
require("dotenv").config()

// Now connect to database
const dbConnect = require("./config/database")
dbConnect();

console.log("Loaded DATABASE_URL from .env:", process.env.DATABASE_URL);

// port
const port = process.env.PORT || 4000

// middleware to parse json
app.use(express.json())

// import routes
const todoRoutes = require("./routes/todos")

// mount the todo apis routes
app.use("/api/v1", todoRoutes)

// start server
app.listen(port, () => {
    console.log(`server started successfully at ${port}`)
})

// default route
app.get("/", (req, res) => {
    res.send("<h1>HomePage</h1>")
})


// const express = require('express');
// const app = express();
// require("dotenv").config(); // ✅ Checkpoint 1

// console.log("✅ Checkpoint 1: Loaded .env");
// console.log("DATABASE_URL =", process.env.DATABASE_URL);

// // Connect to DB
// const dbConnect = require("./config/database");
// dbConnect();

// // Middleware
// app.use(express.json());

// // Mount routes
// const todoRoutes = require("./routes/todos");
// app.use("/api/v1", todoRoutes);
// console.log("✅ Checkpoint 4: Routes mounted at /api/v1");

// // Default route
// app.get("/", (req, res) => {
//     res.send("<h1>HomePage</h1>");
// });

// // Start server
// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//     console.log(`✅ Server started successfully at ${port}`);
// });
