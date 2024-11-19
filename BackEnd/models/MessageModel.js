const mongoose=require('mongoose');

const messageSchema=new mongoose.Schema({
        chatId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Chat',
        },
        sender:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'ChatAppUsers'
        },
        text:{
                type:String,
                require:true,
        },
        read:{
                type:Boolean,
                default:false,
        },
},{timestamps:true})
const Message=mongoose.model('Message',messageSchema)
module.exports =Message;