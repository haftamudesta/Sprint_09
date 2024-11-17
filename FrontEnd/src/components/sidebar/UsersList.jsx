import { useDispatch, useSelector } from "react-redux";
import { createNewChat } from "../../customHooks/FetchApi";
import { setAllChats,setSelectedChat } from "../../redux/user/userSlice";

const UsersList = ({searchKey}) => {
        const {allUsers,allChats,currentUser}=useSelector(state=>state.user)
       const filteredUsers=allUsers?.filter(user=>{
        return (
                (user.name.toLowerCase().includes(searchKey.toLowerCase())&&searchKey) ||
                 (allChats?.some((chat)=>chat?.members?.map(u=>u._id).includes(user._id)))
                )})

        const dispatch=useDispatch()
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

  return (
    <main className="md:ml-20 mt-4">
        {
                filteredUsers&&filteredUsers
                .map((user,index)=>(
                        <div key={index} 
                        className="mb-2 bg-purple-600 border-2 border-gray-400 py-2 px-2 rounded-3xl cursor-pointer"
                        onClick={()=>openChat(user._id)}
                        >
                                <div className="flex justify-between">
                                        <div className="flex gap-4">
                                                <div className="text-lg font-bold bg-red-400 rounded-full px-2 border border-1 border-g">
                                                {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                {user.name}
                                                </div>
                                        </div>
                                         {!allChats.find(chat=>chat?.members.map(u=>u._id).includes(user._id))&&(
                                                <div>
                                                <button className="text-base bg-green-500 text-black px-2 rounded-full text-left"
                                                onClick={()=>StartChat(user._id)}
                                                >
                                                        Start chatting
                                                </button>
                                        </div>
                                         )}
                                        
                                </div>
                        </div>
                ))
        }
    </main>

  )
}
export default UsersList