

const jsonwebToken = require("jsonwebtoken");
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name:{
     type:String ,
     require:[true,"Enter a userName"]
    },
    email:{
     type:String,
     require:true,
    },
    phone:{
      type:String,
      require:true,
    },
    password:{
      type:String,
      require:true,
      minLength:[8,"plese 8 password"],
    },
    isAdmin:{
      type:String,
      default:false, 
    },
    createAt:{
      type:Date,
      default:Date.now
    }
});



    userSchema.methods.generateToken=function(){
    
    try {
   
      return jsonwebToken.sign({
           userId:this._id.toString(),
           email:this.email,
           isAdmin:this.isAdmin
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn:"30d"
      }
      
      );
      
    } catch (error) {
      res.json({msg:error.message}).status(400);
    }
    };


const User =  new mongoose.model("User",userSchema);

module.exports =User;
