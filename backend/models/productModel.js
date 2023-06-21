
const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        maxLength:8
    },
    ratings:{
        type:String,
        default:0
        
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
        
        url:{
            type:String,
            required:true
        },
    }],
    category:{
        type:String,
        require:true,
        
    },
    Stock:{
        type:Number,
        require:true,
        maxLength:4,
        default:1,
        
    },
    numOfReviews:{
        type:Number,
        require:true,
        
    },
    reviews:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            require:true
        },
        name:{
            type:String,
            require:true,
            
        },
        rating:{
            type:Number,
            require:true,
            
        },
        comment:{
            type:String,
            require:true,
            
        },
    }],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
        
    },


})



module.exports = mongoose.model("Product",productSchema);
