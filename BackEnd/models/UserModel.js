const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        require:true,
        default:false
    },
},{timestamps:true})

const ChatAppUsers=mongoose.model('ChatAppUsers',userSchema);
module.exports=ChatAppUsers;