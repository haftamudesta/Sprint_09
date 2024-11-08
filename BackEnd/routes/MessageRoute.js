const express=require('express');
const {authenticate,authorizeAsAdmin}=require('../middleWares/authMiddleWare.js')
const {createMessage,getUserMessages}=require('../controllers/MessageController')
const route=express.Router();

route.post('/create_message',createMessage)
route.post('/get_all_user_message/chatId',getUserMessages)

module.exports=route

