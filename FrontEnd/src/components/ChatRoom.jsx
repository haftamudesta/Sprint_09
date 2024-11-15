import { useSelector } from "react-redux"


const ChatRoom = () => {
        const {selectedChat,currentUser}=useSelector(state=>state.user);
        const userToChat=selectedChat.members?.find(user=>user._id!==currentUser._id)
  return (
    <div className="w-full pr-2 min-h-[70%]">{selectedChat&&(
      <div className="bg-white text-black">
        <div>
          {userToChat?.name}
        </div>
        <div>Chat Area</div>
        <div>
          input elelment
        </div>
      </div>
      
    )}</div>
  )
}

export default ChatRoom