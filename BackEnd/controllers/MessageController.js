const asyncHandler=require('../middleWares/asyncHandler');
const Message=require('../models/MessageModel');
const Chat =require('../models/ChatModel')

const createMessage=asyncHandler(async(req,res)=>{
        try{
                
                const newMessage=new Message(req.body);
                const savedMessage=await newMessage.save();
                const currentChat=await Chat.findById(req.body.chatId);
                currentChat.lastMessage=savedMessage._id;
                currentChat.unReadMessagesCounter+=1;
                const currentMessage=await currentChat.save();
                res.json({
                        message:"Message created successfully",
                        status:true,
                        data:currentMessage
                })
        }catch(error){
                res.status(404).json({
                        message:error.message,
                        status:false,
                })
        }
})
const getUserMessages=asyncHandler(async(req,res)=>{
        try{
                const allMessages=await Message.find({chatId:req.params.chatId}).sort({createdAt:1})
                res.status(200).json({
                        message:'message fetched successfully',
                        status:true,
                        data:allMessages,
                })
        }catch(error){
                res.status(404).json({
                        message:error.message,
                        status:false,
                })
        }     
})
module.exports={createMessage,getUserMessages}