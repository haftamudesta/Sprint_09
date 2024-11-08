const ChatAppUsers=require('../models/UserModel');
const asyncHandler=require('../middleWares/asyncHandler');
const jwt=require('jsonwebtoken');

const authenticate=asyncHandler(async(req,res,next)=>{
        let token;
        token=req.cookies.jwt;
        if(token){
                try{
                        const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
                        req.user=await ChatAppUsers.findById(userId).select("-password");
                        next()
                }catch(error){
                        res.status(401);
                        throw new Error("Not Authenticated, token failed")
                }
        }else{
                res.status(401);
                throw new Error("Not Authenticated,No tokenfound")  
        }
})

const authorizeAsAdmin=(req,res,next)=>{
        if(req.chatappusers &&req.chatappusers.isAdmin){
                next()
        }else{
                res.status(401).json({message:"You are not Authorized as admin"})
        }
}
module.exports={authenticate,authorizeAsAdmin}