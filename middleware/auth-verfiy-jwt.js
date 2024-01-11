



const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/user-models");

           const jwtVerify = async(req,res,next)=>{
            
            try {
                   const token = req.header("Authorization");

                          if(!token){
                            return res.json({msg:"Token is not Found"}).status(401);
                          };

                          const jwtToken = token.replace("Bearer","").trim();
                          const isVerify = await jsonwebtoken.verify(jwtToken,process.env.JWT_SECRET_KEY);
                           const userData = await  User.findOne({email:isVerify.email}).select({password:0});
                            
                                    req.user = userData;
                                    req.token = token;
                                    req.userID= userData._id;

                         next();                
                     } catch (error) {
                        return res.json({msg:error.message}).status(401);
                     }
                    

           };

           module.exports = jwtVerify;

    