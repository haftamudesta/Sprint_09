const {Server}=require('socket.io');
const http=require('http');
const express=require('express');

const server=express();

const serverSocket=http.createServer(server)
const io=new Server(serverSocket,{
   transports: ['websocket', 'polling'],
   wssEngine:['ws','wsss'],
   cors:{
   origin:'*',
   methods:["GET","POST"],
},
allowEIO3:true,
})


module.exports={server,serverSocket,io}