import { useSelector } from "react-redux"
import { createNewMessage,fetchAllMessages,clearUnreadMessageCount } from "../customHooks/FetchApi";
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
//import { BiRightArrow } from "react-icons/bi";
import { FaArrowAltCircleUp } from "react-icons/fa";
import moment from "moment"


const ChatRoom = () => {
        const {selectedChat,currentUser,allChats}=useSelector(state=>state.user);
        const userToChat=selectedChat.members?.find(user=>user._id!==currentUser._id)
        const [message,setMessage]=useState("");
        const [allMessages,setAllMessages]=useState([]);
        const sendMessage=async ()=>{
          try{
            const messageToSend={
              chatId:selectedChat._id,
              sender:currentUser._id,
              text:message,
            }
            const response=await createNewMessage(messageToSend);
            if(response.status){
              setMessage('')
            }
          }catch(error){
            toast.error(error.message);
          }
        }
        const getAllMessages=async ()=>{
          try{
            
            const response=await fetchAllMessages(selectedChat._id);
            if(response.status){
              setAllMessages(response.data)
            }
          }catch(error){
            toast.error(error.message);
          }
        }

        const clearUnreadMessages=async ()=>{
          try{
            
            const response=await clearUnreadMessageCount(selectedChat._id);
            if(response.success){
              allChats.map(chat=>{
                if(chat._id===selectedChat._id){
                  return response.data;
                }else{
                  return chat
                }
              })
            }
          }catch(error){
            toast.error(error.message);
          }
        }
        useEffect(()=>{
          getAllMessages();
          if(selectedChat?.lastMessage?.sender!==currentUser._id){
            clearUnreadMessages();
          }
        },[selectedChat])
const setTimeFormat=(createdAt)=>{
  const now=moment();
  const diff=now.diff(moment(createdAt,'days'))
  if(diff<1){
    return `Today ${moment(createdAt).format('hh:mm A')}`
  }else if(diff==1) {
    return `Yesterday ${moment(createdAt).format('hh:mm A')}`
  }else{
    return `${moment(createdAt).format('MMM D,hh:mm A')}`
  }
}

        
  return (
    <div className=" w-[85%] pr-2  mb-8">{selectedChat&&(
      <div className="bg-white text-black">
        <div className="flex">
          <p>{userToChat?.name}</p>
          <p>{userToChat?.email}</p>
        </div>
        <div className="make_scroll h-[70vh]">
          <div >
            {allMessages.map((message,index)=>{
              const isCurrentUserSender=message.sender===currentUser._id
              return <div key={index}
              className={isCurrentUserSender?'justify-items-end':'justify-items-start'}
              >
                <p className={isCurrentUserSender?'bg-teal-400 border-2 rounded-3xl px-6 rounded-tr-none  py-2 mb-2':'bg-gray-300 border-2 w-60 rounded-3xl px-2 rounded-bl-none  py-2 mb-2'}>
                {message.text}
                </p>
                <p>{setTimeFormat(message.createdAt)}{isCurrentUserSender&&message.read&&
                  <span className="text-red-400 ml-4">message sent</span>}</p>
              </div>
            })}
          </div>
        </div>
        <div className="flex flex-row py-1 px-2 gap-2">
          <input type="text" 
          placeholder="Write Message Here" 
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          className="border-2 border-gray-300 min-w-[90%] rounded-full placeholder:pl-4"
          
          />
          {
            message&&<button 
            className="text-3xl font-bold text-teal-500  py-1 bottom-2 top-1"
            onClick={sendMessage
            }
            ><FaArrowAltCircleUp /></button>
          }
        </div>
      </div>
      
    )}</div>
  )
}

export default ChatRoom