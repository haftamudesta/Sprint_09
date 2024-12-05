const express=require('express');
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser');
const multer=require("multer")
const cors=require('cors')
dotenv.config();
const DBConnection=require('./DbConnection')
const userRoutes=require('./routes/UserRoute')
const chatRoutes=require('./routes/ChatRoutes')
const messageRoutes=require('./routes/MessageRoute')
const {server,serverSocket,io}=require('./utilities/SocketIo')

 const PORT=process.env.PORT || 6002;

 server.use(express.json());
 server.use(cookieParser());
 server.use(cors());
 server.use(express.static("public"))

 server.use('/api/users',userRoutes)
 server.use('/api/chats',chatRoutes)
 server.use('/api/messages',messageRoutes)

//  io.on('connection',socket=>{
//     console.log("connected to socket id:",socket.id)
//  })

 DBConnection().then(()=>{
        try{
            serverSocket.listen(PORT,()=>{
             console.log(`server is running on port ${PORT}`);
         })
         
        } catch(error){
         console.log("Database Connection Error")
         process.exit(1)
        }
 }).catch(error=>{
     console.log("Invalid Database Connection")
     process.exit(1)
 });
 