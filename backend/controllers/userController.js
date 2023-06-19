


const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//register user
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password}= req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is tempr id",
            url:"progilepicurl"
        }
    });

    sendToken(user,201,res);



})

// login user

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    // const {email,password}= req.body;
    // // checking if user has given password
    // if(!email || !password){
    //     return next(new ErrorHandler("please enter email",400));
    // }

    // const user = await User.findOne({email}).select("+password");
    // if(!user){
    //     return next(new ErrorHandler("invalid email or password",401));
    // }

    // const isPasswordMatched = user.comparePassword(password);
    // if(!isPasswordMatched){
    //     return next(new ErrorHandler("invalid email or password",401));
    // }
    // sendToken(user,200,res);

    const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);






})



// logout user

exports.logout = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success:true,
        message:"logged out"
    })
})




//forgot password

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
  
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
  
    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
  
    await user.save({ validateBeforeSave: false });
  
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetToken}`;
  
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
    try {
        

      await sendEmail({
        

        email: user.email,
        subject: `Ecommerce Password Recovery`,
        message,
      });
      

  
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save({ validateBeforeSave: false });
  
      return next(new ErrorHandler(error.message, 500));
    }
  });


  //  reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) =>{

  //creating token hax
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire:{$gt:Date.now()},
  });
  if (!user) {
    return next(new ErrorHandler("reset passsword token is invalid has bee ", 404));
  }
  if(req.body.password !== req.body.confirmPassword){
    return next(new ErrorHandler("password does not match ", 404));
 
  }
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user,200,res);
})

// get user details
exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success:true,
    user,
  })
})

