const { response } = require("express")
const Post=require("../models/postmodel")

exports.createPost=async(req,res)=>{
    try{
const {title,body}=req.body

const post=new Post({
    title,body
})
const savedPost=await post.save()
response.json({
    post:savedPost
})
    }
    catch(err)
    {
return res.status(400).json({
            error: "Error while creating post",
        });
    }
}

exports.getAllPosts=async(req,res)=>
{
    try{
const posts=await Post.find()
.populate("likes")
.populate("comments")
.sort({createdAt:-1})
.exec()
response.json({posts})
    }
    catch(err)
    {
return res.status(400).json({
            error: "Error while fetching posts",
        });
    }
}


