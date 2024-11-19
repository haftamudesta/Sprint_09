import NavBar from "../components/NavBar";
import SideBar from "../components/sidebar/SideBar";
import ChatRoom from "../components/ChatRoom";
import { useSelector } from "react-redux";

const Home = () => {
  const {selectedChat}=useSelector(state=>state.user);
  return (
    <>
      <div>
      <NavBar />
    </div>
    <div className="flex gap-4">
      <SideBar />
      {selectedChat&&<ChatRoom />}
    </div>
    </>
    
    
  )
}

export default Home