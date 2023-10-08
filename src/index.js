const express =require('express');
const bodyParser =require('body-parser')
const {port}=require('./config/serverConfig')
const apiRoutes=require('./routes/index.js')
const db=require('./models/index')
const app=express();

const setupAndStart=()=>{
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes);  
    app.listen(port,()=>{
        if(process.env.DB_SYNC){
            db.sequelize.sync({alert:true});
          }
        console.log("Server Started at "+port)
        
    });
}
setupAndStart();