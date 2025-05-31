const express=require("express")
const router=express.Router()

const{login,signup}=require("../Controllers/Auth")
const{auth,isStudent,isAdmin}=require("../middlewares/auth")
// router.post("/login",login)
router.post("/signup",signup)
router.post("/login",login)

//middleware Protected Routes
router.get("/test",auth,(req,res)=>{
res.json({
    sucess:true,
    message:"welcome to protected route of Test"
})})
router.get("/student",auth,isStudent,(req,res)=>{
res.json({
    sucess:true,
    message:"welcome to protected route of Student"
})
})
router.get("/admin",auth,isAdmin,(req,res)=>{
res.json({
    sucess:true,
    message:"welcome to protected route of admin"
})
})
module.exports=router