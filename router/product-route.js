


const express = require("express");
const { createproduct ,admin ,productDetails,userhistory,productDelete} = require("../controllers/auth-controllers");

          const router = express.Router();
        
        
         router.route("/createproduct").post(createproduct);
         router.route("/getallproduct").get(admin);
         router.route("/product/:id").get(productDetails);
         router.route("/userhistory").post(userhistory);
         router.route("/productdelete/:id").delete(productDelete);


          module.exports=router;