const Todo=require("../models/todo")

exports.getTodo=async(req,res)=>
{
try{
const todos=await Todo.find({});

res.status(200).json({
    success:true,
    data:todos,
    message:"Sucessfully Get"
})
}
catch(error)
{
console.error(err)
req.status(500).json({
    success:false,
    message:"Internal Server Error",
    error:error.message
})
}
}

exports.getTodoById=async(req,res)=>
{

try{
const id=req.params.id
const todo=await Todo.findById({_id:id})
if(!todo)
{
    res.status(404).json({
        success:false,
        message:"Not Found"
    })
}
res.status(200).json({
     success:true,
    data:todo,
    message:"Sucessfully Get todo by id"
})
}
catch(error)
{
console.error(err)
req.status(500).json({
    success:false,
    message:"Internal Server Error",
    error:error.message
})
}
}