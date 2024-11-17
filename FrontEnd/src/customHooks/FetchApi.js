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
