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

io.on('connection',socket=>{
   socket.on('join-room',userId=>{
      socket.join(userId)
   })
   socket.on('sendMessage',(message)=>{
      io
      .to(message.members[0])
      .to(message.members[1])
      .emit('receiveMessage',message)
   })
   socket.on('clearUnreadMessage',(data)=>{
      io
      .to(data.members[0])
      .to(data.members[1])
      .emit('messageCountCleared',data)
   })
})
module.exports={server,serverSocket,io}