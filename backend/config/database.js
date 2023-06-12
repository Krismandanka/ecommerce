

const mongoose = require("mongoose");

const connectDatabase = ()=>{
    

    // process.env.DB_URI

    mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,
        useUnifiedTopology:true,
        
    
    }).then((data)=>{
        console.log(`mongoDb connected with server data ${data.connection.host}`);
    }).catch((err)=>{
        console.log(err)
    })

}


module.exports = connectDatabase;