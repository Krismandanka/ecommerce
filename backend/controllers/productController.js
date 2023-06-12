

const Product = require("../models/productModel");


//create product

exports.createProduct = async (req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,product
    })
}


exports.getAllProducts = async (req,res)=>{
    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    });
}

// get single product
exports.getProductDetails = async ( req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message: "product not found "
        })
    }
    res.status(200).json({
        success:true,
        message:"product found",product
    })
}


// /updateProduct

exports.updateProduct= async (req,res,next)=>{
    let product = Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,
    runValidators:true,
useFindAndModify:false})
res.status(200).json({
    success:true,
    product
})

}


// delete
exports.deleteProduct = async (req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message: "product not found delete"
        })
    }
    
    // await Product.findByIdAndDelete(req.params.id);
    await product.remove().exec();
    res.status(200).json({
        success:true,
        message:"product deleted"
    })
}   



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