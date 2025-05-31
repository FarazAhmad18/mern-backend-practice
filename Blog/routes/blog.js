

const express = require("express");
const router = express.Router();
const { createComment } = require("../controllers/commentController");
const { createLike } = require("../controllers/likeController");
const {createPost,getAllPosts}=require("../controllers/postController")

router.post("/createComment", createComment);
router.post("/createLike",createLike );
router.post("/createPost",createPost)
router.get("/getAllPosts",getAllPosts)
module.exports = router;

