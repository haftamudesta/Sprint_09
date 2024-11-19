const express=require('express');
const {createChat,getAllUserChats,clearUnreadMessages}=require("../controllers/ChatController.js")
const {authenticate,authorizeAsAdmin}=require('../middleWares/authMiddleWare.js')

const route=express.Router();



route.post('/create_chat',authenticate,createChat);
route.get('/getAllChats',authenticate,getAllUserChats);
route.post('/clear_unreadMessages',authenticate,clearUnreadMessages);
module.exports=route;