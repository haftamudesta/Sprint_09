const asyncHandler=require('../middleWares/asyncHandler');
const Chat=require('../models/ChatModel')

const createChat=asyncHandler(async(req,res)=>{
        try{
               const newChat= new Chat(req.body);
               const savedchat=await newChat.save();
               res.status(201).json({
                message:"Chat created successfully",
                success:true,
                savedchat
               })
        }catch(error){
                res.status(400).json({
                        message:error.message,
                        success:false,
                })
        }
})
const getAllUserChats=asyncHandler(async(req,res)=>{
        try{
                const {id}=req.params
                 const allChat= await Chat.find({members:{$in:req.body.userId}});
                //const allChat= await Chat.findOne({id});
                res.status(200).json({
                 message:"Chat fetched successfully",
                 success:true,
                 allChat
                })
         }catch(error){
                 res.status(400).json({
                         message:error.message,
                         success:false,
                 })
         }
})
module.exports={createChat,getAllUserChats}