const asyncHandler=require('../middleWares/asyncHandler');
const Chat=require('../models/ChatModel')
const Message=require('../models/MessageModel')

const createChat=asyncHandler(async(req,res)=>{
        try{
               const newChat= new Chat(req.body);
               const savedchat=(await newChat.save());
               await savedchat.populate('members');
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
                
                 const allChat= await Chat.find({members:{$in:req.body.userId}})
                 .populate("members")
                 .populate("lastMessage")
                 .sort({updatedAt:-1});
                //const allChat= await Chat.findOne({id});
                res.status(200).json({
                 message:"Chat fetched successfully",
                 success:true,
                 data:allChat
                })
         }catch(error){
                 res.status(400).json({
                         message:error.message,
                         success:false,
                 })
         }
})
const clearUnreadMessages=asyncHandler(async(req,res)=>{
        try{
                const chatId=req.body.chatId;
                const chat=await Chat.findById(chatId)
                if(!chat){
                        res.json({
                                message:"chat Not found",
                                success:false
                        })
                }
                const updatedChat=await Chat.findByIdAndUpdate(
                        chatId,
                        {
                                unReadMessagesCounter:0
                        },
                        {
                                new:true,
                        },
                ).populate("members").populate("lastMessage")

                await Message.updateMany(
                        {chatId:chatId,read:false,},
                        {
                                read:true,
                        }
                )
                res.json({
                        message:"chat updated successfully",
                        success:true,
                        data:updatedChat
                })

        }catch(error){
                res.json({
                        message:error.message,
                        status:false,
                })
        }
})
module.exports={createChat,getAllUserChats,clearUnreadMessages}