

const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");


//handling uncaught except
process.on("uncaughtException",(err)=>{
    console.log(`errot :${err.message}`);
    console.log("shutting down server due to uncaught except");

        process.exit(1);
    
})




//config
dotenv.config({path: "backend/config/config.env"});

//connecting database

connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on :${process.env.PORT}`)
});

//unhandle promise rejection
process.on("unhandleRejection",err=>{
    console.log(`errot: ${err.message}`);
    console.log("shutting down server due to unhandle promse rejection");
    server.close(()=>{
        process.exit(1);
    })
})
