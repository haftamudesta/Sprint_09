const mongoose=require('mongoose');

const chatSchema=new mongoose.Schema({
        members:{
                type:[
                        {
                                type:mongoose.Schema.Types.ObjectId,
                                ref:"ChatAppUsers"
                      }
                ]
        },
        lastMessage:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"messages"
        },
        unReadMessagesCounter:{
                type:Number,
                default:0,
        },

},{timestamps:true})
const Chat=mongoose.model("Chat",chatSchema)
module.exports=Chat;