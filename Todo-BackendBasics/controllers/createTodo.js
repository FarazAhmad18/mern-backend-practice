const Todo=require("../models/todo")

exports.createTodo=async(req,res)=>{
    try
    //destructuring
    {const {title,description}=req.body
    //insert in db
    const response=await Todo.create({title,description});
        //send json response success
        res.status(200).json(
{            success:true,
            data:response,
            message:"Entry created Successfully"}
        )}
        catch(error){
console.error(error)
//500 server error
res.status(500).json(
{
success:false,
data:"Internal Server Error",
message:error.message
}
) 

} 
  }



// const Todo = require("../models/todo");

// exports.createTodo = async (req, res) => {
//     console.log("✅ Checkpoint 5: Hit createTodo route");
//     console.log("Request Body:", req.body);

//     try {
//         const { title, description } = req.body;

//         if (!title || !description) {
//             console.log("❌ Checkpoint 6: Missing title or description");
//             return res.status(400).json({
//                 success: false,
//                 message: "Title and Description are required"
//             });
//         }

//         const response = await Todo.create({ title, description });
//         console.log("✅ Checkpoint 7: Todo saved in DB");

//         res.status(200).json({
//             success: true,
//             data: response,
//             message: "Entry created Successfully"
//         });

//     } catch (error) {
//         console.error("❌ Checkpoint 8: Error during DB save");
//         console.error(error.message);

//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };
