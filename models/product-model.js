


   const mongoose = require("mongoose");


   const ProductSchema =new mongoose.Schema({
     name:{
        type:String
     },
     author:{
      type:String
   },
     price:{
        type:Number
     },
     description:{
        type:String
     },
     url:{
        type:String
     },
     stock:{
        type:Number
     },
      createdAt:{
        type:Date,
        default:Date.now
     }     

   });


   const Product = new mongoose.model("product",ProductSchema);

   module.exports =Product;
   