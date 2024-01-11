   
  const mongoose = require("mongoose");



  async function DataConnect(){
 
    //await 
     mongoose.connect(process.env.DB_URI).then((data)=>{
        console.log("databse add success");
      }).catch((err)=>{
         console.log("Databse fail",err);
      });
 } 
 module.exports=DataConnect;
 