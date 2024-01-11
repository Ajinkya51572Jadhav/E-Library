


  const express =require("express");
  const cors = require("cors"); 
  const bodyParser = require("body-parser");
   const dotenv = require("dotenv");

  const DataConnect = require("./utils/database");
 
   const app = express();

       
      app.use(cors());
      app.use(bodyParser.urlencoded({extended:true}));
      app.use(express.json());
    
       dotenv.config({path:"./utils/.env"});
require("dotenv").config({ path: "server/utils/.env" });

       const router = require("./router/auth-router");
       const contactrouter = require("./router/contact-route");
       const productrouter = require("./router/product-route");
         

      app.use("/api/auth",router);
      app.use("/api/auth",productrouter);
      app.use("/api/form",contactrouter);

  

  DataConnect();
  
   const uri = process.env.PORT || 5000
    app.listen(uri,()=>{
        console.log("port successfully");
    });


    