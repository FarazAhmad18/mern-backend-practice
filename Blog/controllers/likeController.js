const Like=require("../models/likemodel")
const Post=require("../models/postmodel")
exports.createLike=async(req,res)=>
{
    try{
const {post,user}=req.body;
const like=new Like({
    post,user
}) 
const savedLike=await like.save();
const updatedPost=await Post.findByIdAndUpdate(post,{$push:{likes:savedLike._id}},{new:true})
.populate("likes")
.exec()
return res.json({
      post: updatedPost,
})
    }
    catch(err)
    {
      return res.status(400).json({
      error: "Error while liking post",
      details: error.message,   })
    }
}
