const express =require('express');
const {port}=require("./config/serverConfig")
const app=express();

const setupAndStart=()=>{
    app.listen(port,()=>{
        console.log("Server Started at "+port)
        
    });
}
setupAndStart();