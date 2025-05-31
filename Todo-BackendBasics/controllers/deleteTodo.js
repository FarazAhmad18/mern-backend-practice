const Todo=require("../models/todo")

exports.deleteTodo=async(req,res)=>{
    try{
const {id}=req.params
const todo=await Todo.findByIdAndDelete(
  id
)
res.json(
    {
    success:true,
    message:"deleted successfully"   
    }
)
    }
    catch(error){
console.error(error)
req.status(500).json({
    success:false,
    message:"Internal Server Error",
    error:error.message
})
    }
}