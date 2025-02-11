const express=require('express');
const {createChat,getAllUserChats}=require("../controllers/ChatController.js")
const {authenticate,authorizeAsAdmin}=require('../middleWares/authMiddleWare.js')

const route=express.Router();



route.post('/create_chat',createChat);
route.post('/:userId',getAllUserChats);
module.exports=route;