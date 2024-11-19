const express=require('express');
const {authenticate,authorizeAsAdmin}=require('../middleWares/authMiddleWare.js')
const {createMessage,getUserMessages}=require('../controllers/MessageController')
const route=express.Router();
route.post('/create_message',authenticate,createMessage)
route.get('/get_all_user_message/:chatId',authenticate,getUserMessages)
module.exports=route;

