

const ErrorHandler = require("../utils/errorhandler");

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";


//wrong mongodb id error
    if(err.name === "CastError"){
        const message = `Resourse not found:${err.path}`;
        err = new ErrorHandler(message,400);
    }

    // mongoose duplicate key error
    if(err.code === 11000){
        const message = `duplicate ${Object.keys(err.keyValue)} enter`;
        err = new ErrorHandler(message,400);
    }

    // wrong JWT error
    if(err.name === "JsonWebTokenError"){
        const message = `Json web token is invalid try again`;
        err = new ErrorHandler(message,400);
    }
    if(err.name === "TokenExpiredError"){
        const message = `Json web token is expiredd try again`;
        err = new ErrorHandler(message,400);
    }



    res.status(err.statusCode).json({
        success: false,
        error: err,//err.stack address
        message:err.message,
    })
}