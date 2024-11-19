import { axiosInstance } from "./Token";
export const fetchAllUsers=async ()=>{
        try{
                const response=await fetch('/api/users/getAllUsers');
                const res=await response.json()
                return res;
        }catch(error){
                console.log(error.message)
        }
}
export const createNewChat=async (members)=>{
        try{
                 const response=await axiosInstance.post('/api/chats/create_chat',{members});
                return response.data;
        }catch(error){
                console.log(error.message)
        }
}
export const fetchAllUserChats=async ()=>{
        try{
                 const response=await fetch ('/api/chats/getAllChats');
                        const res=await response.json()
                        return res;
        }catch(error){
                console.log(error.message)
        }
}
export const createNewMessage=async (message)=>{
        try{
               const response=await fetch("/api/messages/create_message",{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(message)}) 
                const res= await response.json()
               return res;
        }catch(error){
                console.log(error)
        }
}

export const fetchAllMessages=async (chatId)=>{
        try{
               const response=await fetch(`/api/messages/get_all_user_message/${chatId}`) 
                const res= await response.json();
               return res;
        }catch(error){
                console.log(error)
        }
}

export const clearUnreadMessageCount=async (chatId)=>{
        try{
               const response=await axiosInstance.post(`/api/chats/clear_unreadMessages`,{chatId}) 
               return response.data;
        }catch(error){
                console.log(error)
        }
}