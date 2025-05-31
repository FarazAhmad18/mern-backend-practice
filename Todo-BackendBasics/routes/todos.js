const express=require("express")
const router=express.Router();


//import controller
const {createTodo}=require("../controllers/createTodo")
const {getTodo,getTodoById}=require("../controllers/getTodo")
const {updateTodo}=require("../controllers/UpdateTodo")
const {deleteTodo}=require("../controllers/deleteTodo")

router.post("/createTodo",createTodo)
router.get("/getTodo",getTodo)
router.get("/getTodo/:id",getTodoById)
router.put("/updateTodo/:id",updateTodo)
router.delete("/deleteTodo/:id",deleteTodo)

module.exports=router;


// const express = require("express");
// const router = express.Router();

// const { createTodo } = require("../controllers/createTodo");

// router.post("/createTodo", createTodo);

// module.exports = router;
