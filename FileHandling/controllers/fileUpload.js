const File = require("../models/File");
const cloudinary=require("cloudinary").v2
//localFile handler

exports.localfileUpload = async(req,res) => {
  try {
    //1. fetch file
    // .file bcz while testing req in form named "file"
    const file = req.files.file;
    console.log("file:",file)
    //2. create path where to store file on server
    //slpit file on the basis of dot and return index 1. to give extension to file
    const path = __dirname + "/files/" + Date.now() +`.${file.name.split('.')[1]}`;
    console.log("path:",path)
    //3.move file to that path
    file.mv(path, (err) => {
      console.log(err);
    });
    //4. success status
    res.json({
      success: true,
      message: "Local file uploaded successfulle",
    });
  } catch (err) {
    res.json({
      success: false,
      message: "error in uploading file",
    });
  }
};

// making this function outside bcz will be used in others as well 
async function uploadToCloudinary(file,folder,quality){
    const options={folder}
    options.resource_type="auto"
    if(quality)
    {
        options.quality=quality;
    }
return await cloudinary.uploader.upload(file.tempFilePath,options)
}


function isFileTypeSupported(type,supportedFile){
return supportedFile.includes(type)
}
exports.imageUpload=async(req,res)=>{
try {//1. fetch data and img
const {name,email,tags}=req.body
console.log(name,email,tags)
const file=req.files.imgFile

//2. validate
const supportedTypes=["jpg","png","jpeg"]
const fileType=file.name.split(".")["1"].toLowerCase()
//if format not supported
if(!isFileTypeSupported(fileType,supportedTypes))
{
    return res.json({
        success:false,
        message:"file format not supported"
    })
}
// 3. upload to cloudinary
//if supported
const response=await uploadToCloudinary(file,"LearnFileHandling")
console.log(response)

// 4. create entry in db
const fileData=await File.create({
    name,
    email,
    tags,
    imgUrl:response.secure_url,
})
res.status(200).json({
    success:true,
    img_Url:response.secure_url,
    message:"file uploaded sucessfully"
})
}
catch(err){
console.log(err)
res.status(400).json({
    success:false,
    message:"file not uploaded"
})
}
}

exports.videoUpload=async(req,res)=>{
try {//1. fetch
const {name,tags,email}=req.body
const file=req.files.vidFile
console.log(name,email,tags)
//2. validate
const suportedFormat=["mp4","mov"]
const fileFormat=file.name.split(".")[1].toLowerCase()
console.log("Uploaded file format:", fileFormat);

if(!isFileTypeSupported(fileFormat,suportedFormat))
{
    res.status(400).json({
        sucess:false,
        message:"file type not supoerted"
    })
}
console.log("this is before response")

//3 upload
const response=await uploadToCloudinary(file,"LearnFileHandling")
// const response = await uploadToCloudinary(file, "LearnFileHandling", "video");
console.log("this is after response:",response)
//4. create entry in db
const newEntry=File.create({
  name,tags,email,
  imgUrl:response.secure_url
})

res.status(200).json({
    success:true,
    img_Url:response.secure_url,
    message:"video file uploaded sucessfully"
})
}
catch(err){
console.log(err)
res.status(400).json({
    success:false,
    message:"video file not uploaded",
    error:err
})
}
}

exports.imageReducerUpload=async(req,res)=>{
try{
//1.fetch
const {name,tags,email}=req.body
const file=req.files.vidFile
console.log(name,email,tags)
//2. validate
const suportedFormat=["png","jpg","jpeg"]
const fileFormat=file.name.split(".")[1].toLowerCase()
console.log("Uploaded file format:", fileFormat);
if(!isFileTypeSupported(fileFormat,suportedFormat))
{
    res.status(400).json({
        sucess:false,
        message:"file type not supoerted"
    })
}
console.log("this is before response")

//3 upload
const response=await uploadToCloudinary(file,"LearnFileHandling",30)
console.log("this is after response:",response)
//4. create entry in db
const newEntry=File.create({
  name,tags,email,
  imgUrl:response.secure_url
})

res.status(200).json({
    success:true,
    img_Url:response.secure_url,
    message:"video file uploaded sucessfully"
})
}
catch(error){
    console.log(err)
res.status(400).json({
    success:false,
    message:"compress file not uploaded",
    error:err
})
}
}