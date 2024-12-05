import NavBar from "../components/NavBar";
import SideBar from "../components/sidebar/SideBar";
import ChatRoom from "../components/ChatRoom";
import { useSelector } from "react-redux";
import io from "socket.io-client"
import { useEffect } from 'react';

const socket=io.connect(`http://localhost:3001`, {
  reconnection:true,
  path: "/socket.io",
  transports: ['websocket','polling'],
  withCredentials: true,
  reconnectionAttempts: 5,
  wssEngine:['ws','wsss'],
  allowEIO3:true,
})

const Home = () => {
  const {selectedChat,currentUser}=useSelector(state=>state.user);
  useEffect(()=>{
    if(currentUser){
      socket.emit('join-room',currentUser._id);
    }
  },[currentUser])
  return (
    <>
      <div>
      <NavBar />
    </div>
    <div className="flex gap-2">
      <SideBar socket={socket} />
      {selectedChat&&<ChatRoom socket={socket} />}
    </div>
    </>
    
    
  )
}

export default Home