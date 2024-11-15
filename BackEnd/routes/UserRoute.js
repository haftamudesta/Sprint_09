const express=require('express');
const {createtUser,signIn,signOut,getAllUsers,getSingleUsers,updateUser}=require('../controllers/UserController.js')
const {authenticate,authorizeAsAdmin}=require('../middleWares/authMiddleWare.js')

const route=express.Router();



route.post('/createUser',createtUser);
route.post('/sign_in',signIn);
route.post('/sign_out',signOut);
route.get('/getAllUsers',getAllUsers)
route.get('/:userId',authenticate,getSingleUsers)
route.put('/:userId',authenticate,updateUser)
module.exports=route;