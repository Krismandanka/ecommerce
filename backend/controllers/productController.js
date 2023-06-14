

const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatues");


//create product

exports.createProduct = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,product
    })
});


exports.getAllProducts = catchAsyncErrors(async (req,res)=>{
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();


    const apiFeature = new ApiFeatures(Product.find(),req.query).serarch().filter().pagination(resultPerPage);
    const products = await apiFeature.query;
    res.status(200).json({
        success:true,
        products,
        productCount,
    });
});

// get single product
exports.getProductDetails = catchAsyncErrors(async ( req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product not found",404));
    }
    res.status(200).json({
        success:true,
        message:"product found",product
    })
})


// /updateProduct

exports.updateProduct= catchAsyncErrors(async (req,res,next)=>{
    let product = Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product not found",404));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,
    runValidators:true,
    useFindAndModify:false})
res.status(200).json({
    success:true,
    product
})

})


// delete
exports.deleteProduct =catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product not found",404));
    } 
    
    // await Product.findByIdAndDelete(req.params.id);
    await product.remove().exec();
    res.status(200).json({
        success:true,
        message:"product deleted"
    })
}   
)


// exports.deleteProduct = async (req,res,next)=>{
//     const product = await Product.findByIdAndDelete(req.params.id)
//                             .exec()
//                             .then((docs)=>{
//                                 return res.status(200).json({
//                                             success:true,
//                                              message:"product deleted"
//                                          })
//                             })
//                             .catch((err)=>{
//                                 return res.status(500).json({
//                                               success:false,
//                                                  message: "product not found delete"
//                                              })
//                             })
    

// }