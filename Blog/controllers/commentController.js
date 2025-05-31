    const Comment=require("../models/commentmodel")
    const Post=require("../models/postmodel")
     exports.createComment=async(req,res)=>
    {
        try{
const {post,user,body}=req.body
const comment = new Comment({
    post,body,user
})
const savedComment=await comment.save()
const updatedPost=await Post.findByIdAndUpdate(post,{$push:{comments:savedComment._id}},{new:true})
.populate("comments")
.exec()
res.json({
    post:updatedPost
})

        }
        catch(err)
        {
res.status(500).json({
    error:"error while creating comment"
})
        }
    }

// const Comment = require("../models/commentmodel");
// const Post = require("../models/postmodel");

// exports.createComment = async (req, res) => {
//   try {
//     const { post, user, body } = req.body;

//     // Create and save new comment
//     const comment = new Comment({ post, user, body });
//     const savedComment = await comment.save();

//     // Add comment to the post and populate updated post
//     const updatedPost = await Post.findByIdAndUpdate(
//       post,
//       { $push: { comments: savedComment._id } },
//       { new: true }
//     ).populate("comments").exec();

//     res.json({ post: updatedPost });
//   } catch (err) {
//     console.error("Error in createComment:", err);
//     res.status(500).json({ error: "Error while creating comment" });
//   }
// };



