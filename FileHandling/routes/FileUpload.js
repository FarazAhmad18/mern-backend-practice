const express=require("express")
const router = express.Router();

// const {imageUpload,videoUpload,imageReducerUpload,localfileUpload}=require("../controllers/fileUpload")
const {localfileUpload,imageUpload,videoUpload,imageReducerUpload}=require("../controllers/fileUpload")

router.post("/localfileUpload",localfileUpload)
router.post("/imageUpload",imageUpload)
router.post("/videoUpload",videoUpload)
router.post("/imageReducerUpload",imageReducerUpload)
module.exports=router

