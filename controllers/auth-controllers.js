
const bcryptjs = require("bcryptjs");
const User = require("../models/user-models");
const Contact = require("../models/contact-model");
const Product = require("../models/product-model");
const UserHistory =require("../models/userHistory-model");


const home=async(req,res)=>{
   try {
    res.send("this is home page");
   } catch (error) {
  
   }
};



  const register=async(req,res)=>{
     try {
           const {name,email,phone,password} =req.body; 
     
      if(!name || !email || !phone  || !password){
      return  res.json({msg:"Invalid Validation"}).status(400);
      };
     
      if(!email.includes("@gmail.com")==true){
      return  res.json({msg:"Email Includes @gmail.com"}).status(400); 
      };

      if(!(phone.length==10)==true){
      return  res.send({msg:"Phone Number Must Be 10 "}).status(400); 
      }; 

      if(!(password.length==8)==true){
      return  res.json({msg:"Password Minimum 8 Number"}).status(400); 
      };

           const userExist = await User.findOne({email:email});

              if(userExist){
                  return res.json({msg:"Email Already Exists"}).status(400);   
              }; 

                const saltRound = 10;
              const passwordHash = await bcryptjs.hash(password,saltRound);

                if(!passwordHash){
                  return res.json({msg:"Password Greater Then 8 Character"}).status(400);
                 };

              const userCreated =  await User.create({name,email,phone,password:passwordHash});
     
           res.json({
               msg:"user register successfully",
               token:await userCreated.generateToken(),
               userId:userCreated._id.toString()
              }).status(200);
   
          
     } catch (error) {
           res.json({
               error:error.message
           }).status(404);
     }
  };



  const login = async(req,res)=>{
    try{
      
      const {email,password}=req.body;
     
      if(!email ||  !password){
        return res.json({msg:"Invalid Validation"}).status(400);
     }
 
       const emailExist = await User.findOne({email:email});

             if(!emailExist){
              return res.json({msg:"Email is Not Found"}).status(401);
           };

             const isPassword = await bcryptjs.compare(password,emailExist.password);
           
           if(!isPassword){
            return res.json({msg:"isPassword is not Found"}).status(401);
          };



      res.json({
         msg:"user login successfully",
         token:await emailExist.generateToken(), 
         userId:emailExist._id.toString()
      }).status(200);


    }catch(error){
      res.json({
        error:error.message
      }).status(400);
    }


  };


  const contact=async(req,res)=>{

    try {

      const {user,email,message}=req.body;
        
           if(!user || !email || !message){
            return res.json({msg:"Invalid Validation" }).status(400);
           };

           if(!email.includes("@gmail.com")==true){
          return  res.json({msg:"Email Includes @gmail.com"}).status(400);
           }


      await Contact.create({user,email,message});
      return res.json({msg:"Message Send SuccessFully"}).status(200);

    } catch(error){
      return res.json({msg:error.message}).status(400);
    };
    
  };

   const user =async(req,res)=>{
      const userData = req.user;
try {
  
  res.json({userData}).status(200);

} catch (error) {
  res.json({msg:error.message}).status(400);
}
      
   };



const admin =async(req,res)=>{

  try {
  const adminData = await User.find();
  const ContactData = await Contact.find();
  const productData = await Product.find();
  const userHistory = await UserHistory.find();

res.json({
  adminData:adminData,ContactData:ContactData,productData:productData,userHistory:userHistory
}).status(200);

} catch (error) {
res.json({msg:error.message}).status(400);
}
    
 };
   



  

const userdelete=async(req,res)=>{
       try {
        const id =req.params.id;
        if(!id){
          return res.json({msg:`Id ${req.params.id} is Not Found`}).status(401);
       };         
        const userId = await User.findById({_id:id});  
        if(!userId){
         return res.json({msg:`Id ${req.params.id} is Not Found`}).status(401);
      };
          await userId.deleteOne();

        res.json({
          msg:"Delete User SuccessFully",
        });

       } catch (error) {
     }
}


const msgdelete=async(req,res)=>{
  try {
    const id =req.params.id;
    if(!id){
      return res.json({msg:`Id ${req.params.id} is Not Found`}).status(401);
   };         
    const msgId = await Contact.findById({_id:id});
    if(!msgId){
     return res.json({msg:`Id ${req.params.id} is Not Found`}).status(401);
  };
      await msgId.deleteOne();
   res.json({
     msg:"Delete Contact MSG SuccessFully",
   });
  } catch (error) {
}
}

//  createProduct
     const createproduct =async(req,res)=>{ 
                  try{
                    const {name, author,price,description,url} =req.body; 
     
                    if(!name || ! author || !price || !description  || !url){
                    return  res.json({msg:"Invalid Validation"}).status(400);
                    };
                   
                 const productCreated =  await Product.create(req.body);
                   
                         res.json({
                             msg:"Product Created successfully",
                             productCreated
                            }).status(200);
                 

                 } catch (error) {
                  console.log(error);
                 }
     };




    const productDetails =async(req,res)=>{

      try {
       
      const productOneDatils =  await Product.findById(req.params.id)
      console.log("request",req.body.id);
   if(!productOneDatils){
   return  res.json({msg:"Product Not Found"}).status(400);
    }

        res.json({
          productOneDatils
        }).status(200)

      } catch (error) {
        console.log(error);
      }
    };
      


        const userhistory =async(req,res)=>{
            try {
                 const userbookhistory = req.body;

                 console.log("userbookhistory",userbookhistory);   
              const userhistory =  await  UserHistory.create(userbookhistory);
                      console.log("userhostiry",userhistory);
                if(!userhistory){
                  return  res.json({msg:"User History Not Found"}).status(400);
                   }
                       res.json({
                         userhistory
                       }).status(200)
                      
              } catch (error) {
              console.log(error);
            }
        };



  
const productDelete =async(req,res)=>{
  try {
    const id =req.params.id;
    if(!id){
      return res.json({msg:`Id ${req.params.id} is Not Found`}).status(401);
   };         
    const productId = await Product.findById({_id:id});
    if(!productId){
     return res.json({msg:`Id ${req.params.id} is Not Found`}).status(401);
  };
      await productId.deleteOne();
   res.json({
     msg:"Delete Product SuccessFully",
   });
  } catch (error) {
}
}



const userhistorydelete =async(req,res)=>{
  try {
    const id =req.params.id;
    if(!id){
      return res.json({msg:`Id ${req.params.id} is Not Found`}).status(401);
   };         
    const userIdHistory = await   UserHistory.findById({_id:id});
    if(!userIdHistory){
     return res.json({msg:`Id ${req.params.id} is Not Found`}).status(401);
  };
      await userIdHistory.deleteOne();
   res.json({
     msg:"Delete USer History SuccessFully",
   });
  } catch (error) {
}
}




  module.exports={
    home,register,login,contact,user,admin,createproduct,productDetails,userhistory,
    productDelete ,userdelete,msgdelete ,userhistorydelete
  };   