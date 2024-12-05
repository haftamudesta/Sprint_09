import { useDispatch, useSelector } from "react-redux";
import { createNewChat } from "../../customHooks/FetchApi";
import { setAllChats,setSelectedChat } from "../../redux/user/userSlice";
import moment from "moment";
import { useEffect } from "react";
import { store } from "../../redux/Store";

const UsersList = ({searchKey,socket}) => {
        const {allUsers,allChats,currentUser,selectedChat}=useSelector(state=>state.user)
        //const [unreadMessageFlag,setUnreadMessageFlag]=useState(false)
//        const filteredUsers=allUsers?.filter(user=>{
//         return (
//                 (user.name.toLowerCase().includes(searchKey.toLowerCase())&&searchKey) ||
//                  (allChats?.some((chat)=>chat?.members?.map(u=>u._id).includes(user._id)))
//                 )})
function filterUserChat(){
        if(searchKey===''){
                return allChats;
        }else{
               return allUsers.filter(user=>user.name.toLowerCase().includes(searchKey.toLowerCase()))
        }

}
        const dispatch=useDispatch()
        const chatSelected=(user)=>{
                if(selectedChat){
                        return selectedChat?.members?.map(u=>u._id).includes(user?._id)
                }
        }
        const StartChat=async(userId)=>{ 
                
                try{
                        const res=await createNewChat([currentUser._id,userId])
                        
                        if(res){
                                const newChat=res.savedchat;
                                const updatedChats=[...allChats,newChat];
                                dispatch(setAllChats(updatedChats))
                                dispatch(setSelectedChat(newChat))
                        }
                }catch(error){
                        return error
                }
        }
        const openChat=(chatUserId)=>{
                const findChat=allChats.find(chat=>chat?.members.map(u=>u._id).includes(currentUser._id) && chat?.members.map(u=>u._id).includes(chatUserId))
                if(findChat){
                        
                        dispatch(setSelectedChat(findChat))
                }
        }
        const fetchLastMessage=(userId)=>{
                const searchChat=allChats?.find(chat=>chat?.members?.map(u=>u._id).includes(userId))
                if(!searchChat ||!searchChat.lastMessage){
                        return ""
                }else{
                        const  messagePreFix=searchChat?.lastMessage?.sender===currentUser._id?"You  ":"";
                        return messagePreFix + searchChat?.lastMessage?.text?.substring(0,30);
                }
        }
        const getLastTimeMessageSent=(userId)=>{
                const searchChat=allChats?.find(chat=>chat?.members?.map(u=>u._id).includes(userId))
                if(!searchChat && searchChat?.lastMessage){
                        return ""
                }else{
                        return moment(searchChat?.lastMessage?.createdAt).format('hh:mm A');
                }    
        }
        const getUnreadmessageCount=(userId)=>{
                const chat=allChats.find(chat=>chat?.members?.map(member=>member._id).includes(userId))
                if(chat && chat.unReadMessagesCounter && chat.lastMessage.sender!==currentUser._id){
                        return <p className="text-black rounded-full bg-red-400 px-2"> {chat.unReadMessagesCounter}</p>
                }else{
                        return ""
                }
        }
        useEffect(()=>{
                socket.on('receiveMessage',(message)=>{
                const selectedChat=store.getState().user.selectedChat;
                let allChats=store.getState().user.allChats;
                if(selectedChat?._id!==message.chatId){
                        const updatedChat=allChats.map((chat)=>{
                                if(chat?._id===message.chatId){
                                        return{
                                                ...chat,
                                                unReadMessagesCounter:(chat.unReadMessagesCounter||0)+1,
                                                lastMessage:message,
                                        }
                                }
                                return chat;
                        });
                        allChats=updatedChat;
                        //dispatch(setAllChats(updatedChat));
                        
                }
                const latestChat=allChats?.find((chat)=>chat?._id===message.chatId);
                const otherChats=allChats?.filter((chat)=>chat._id!==message.chatId);
                allChats=[latestChat, ...otherChats];
                dispatch(setAllChats(allChats));
                })
        })

  return (
    <main className="w-[100%] mt-4">
        {
                filterUserChat()?.map((object,index)=>{
                        let user=object;
                        if(object?.members){
                                user=object.members?.find(user=>user._id!==currentUser._id);
                        }
                        return <div key={index} 
                        className={`mb-2 bg-purple-600 border-2 border-gray-400 py-2 px-2 rounded-3xl cursor-pointer`}
                        onClick={()=>openChat(user._id)}
                        >
                                <div className={`${chatSelected(user)?'bg-red-300':''}  flex justify-between`}>
                                        <div className="flex gap-4">
                                                <div className="text-lg font-bold bg-red-400 rounded-full px-2 border border-1 ">
                                                {user?.name}
                                                </div>
                                                <div>
                                                 <div className="flex flex-row gap-6">
                                                 <p> {user?.name}</p>
                                                 
                                                {getUnreadmessageCount(user?._id)}
                                                 
                                                 
                                                 <p>{getLastTimeMessageSent(user?._id)}
                                                 </p>
                                                 
                                                 </div>
                                                <p>{fetchLastMessage(user?._id)||user?.email}</p>
                                                </div>
                                        </div>
                                         {!allChats.find(chat=>chat?.members?.map(u=>u._id).includes(user?._id))&&(
                                                <div>
                                                <button className="text-base bg-green-500 text-black px-2 rounded-full text-left"
                                                onClick={()=>StartChat(user?._id)}
                                                >
                                                        Start chatting
                                                </button>
                                        </div>
                                         )}
                                        
                                </div>
                        </div>
                        })
        }
    </main>

  )
}
export default UsersList