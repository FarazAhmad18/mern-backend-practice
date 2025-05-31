const jwt = require("jsonwebtoken");
require("dotenv").config();

// Auth middleware
exports.auth = (req, res, next) => {
  try {
    console.log("cookies",req.cookies.token)
    console.log("body token:",req.body.token)
    console.log("Header",req.header("Authorization"))
    // const token = req.cookies.token||req.body.token||req.header("Authorization").replace("Bearer","");
    // const token = req.header("Authorization").replace("Bearer","");
    const token = req.header("Authorization")?.split(" ")[1];


    if (!token) {
      return res.json({
        success: false,
        message: "token not found",
      });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_Secret);
      req.user = payload;
      console.log(payload)
      next(); // call next ONLY if token is valid
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "something went wrong, while verifying the token",
    });
  }
};

// isStudent middleware
exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false, // fix success flag to false
        message: "this is a protected route for Students only",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "user role is not matching",
    });
  }
};

// isAdmin middleware
exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "this is a protected route for Admins only",
      });
    }
    next(); // missing next call here
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "user role is not matching",
    });
  }
};
