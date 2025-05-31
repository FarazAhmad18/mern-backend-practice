const bcrypt=require("bcrypt")
const User=require("../models/User")
const jwt=require("jsonwebtoken")
require("dotenv").config()
exports.signup= async(req,res)=>{
    try{
const {name,email,password,role}=req.body
const existingUser=await User.findOne({email})
if(existingUser)
{
return res.status(400).json({
    success:false,
    message:"user already exist"
})
}
let hashPass;
try{
hashPass=await bcrypt.hash(password,10)
}
catch(error)
{
return res.status(500).json(
    {
        success:false,
        message:"error in hashing password"
    }
)
}
const user=await User.create({
    name,email,password:hashPass,role
})
res.json({
    success:true,
    message:"user created successfully"
})
}
catch(error)
{
    console.error(error)
res.json({
    success:false,
    message:"error in creating user",
     error: error.message
})
}
}


exports.login=async(req,res)=>{
try{
    //1 took pas email from req body
const{password,email}=req.body
//now validating that req body data weather its empty or filled. we can add mode validation layers but for now this is enough
if(!password||!email)
{
    res.status(400).json({
        success:false,
        msg:"again fill the all details"

    })
}
// finding that email in db
let user=await User.findOne({email})
//if not found then user doesnt exist
if(!user)
{
    res.status(401).json({
        success:false,
        msg:"signup this user doesNot Exist"
    })
}
let payload={
    email:user.email,
    id:user._id,
    role:user.role
}
// comparing passwords if password correct login.
// user exist. now we have to create jwt token and send it to client that will be using it in further requests
if(await bcrypt.compare(password,user.password) )
{
let token=jwt.sign(
    payload,
    process.env.JWT_Secret,
    {
        expiresIn:"2h"
    }
)
user=user.toObject()
user.token=token
// user.password=undefined
delete user.password
const options={
httpOnly:true,
expires:new Date(Date.now()+3*24*60*60*1000)
}

// res.cookie("token",token,options).status(200).json({
//     success:true,
//     token,
//     user,
//     message:"user logged in successfully"
// })

res.status(200).json({
     success:true,
     token,
     user,
     message:"user logged in successfully"
 })

}
else{
    res.status(300).json({
        success:false,
        msg:"incorrect password"
    })
}
}
catch(error)
{
console.log(error)
return res.status(500).json({
success:false,
message:"login failure"
})
}
}



// exports.login = async (req, res) => {
//   try {
//     const { password, email } = req.body;

//     // Validate required fields
//     if (!password || !email) {
//       return res.status(400).json({
//         success: false,
//         msg: "Please fill in all required details",
//       });
//     }

//     // Find user in DB
//     let user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         msg: "User does not exist. Please sign up first.",
//       });
//     }

//     // Compare password
//     const isPasswordCorrect = await bcrypt.compare(password, user.password);

//     if (!isPasswordCorrect) {
//       return res.status(403).json({
//         success: false,
//         msg: "Incorrect password",
//       });
//     }

//     // Create JWT token
//     const payload = {
//       email: user.email,
//       id: user._id,
//       role: user.role,
//     };

//     const token = jwt.sign(payload, process.env.JWT_Secret, {
//       expiresIn: "2h",
//     });

//     // Convert user to plain object so we can modify it safely
//     user = user.toObject();

//     // Add token to user object (for sending back to client)
//     user.token = token;

//     // Remove password before sending
//     delete user.password;

//     // Set cookie
//     const options = {
//       httpOnly: true,
//       expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
//     };

//     // Send response
//     return res.cookie("token", token, options).status(200).json({
//       success: true,
//       token,
//       user,
//       message: "User logged in successfully",
//     });
//   } catch (error) {
//     console.log("Login Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Login failed. Something went wrong.",
//     });
//   }
// };
