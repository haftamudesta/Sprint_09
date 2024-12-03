import { useSelector } from "react-redux"
import {toast} from "react-toastify"
import { useNavigate } from "react-router";
const NavBar = () => {
        const currentUser=useSelector(state=>state.user.currentUser);
        const navigate=useNavigate();
        const handleSignOut=async()=>{
                const res=await fetch('/api/users/sign_out',{
                        method: 'POST',
                      });
                      const data=await res.json();
                      if(data.success){
                        toast.success(data.message);
                      navigate('/sign_in')
                      }
        }
  return (
    <main>
        <div className="p-4">
        <div className="flex justify-between mt-8">
                <div className="text-pink-500">
                        <p>My Chat App</p>
                </div>
                <div className="flex gap-8">
                        <p>{currentUser?.name}</p>
                        <p>{currentUser?.email}</p>
                        {
                                currentUser&&
                                <button className="text-lg bg-lime-500 rounded-full px-2 py-0.5"
                                onClick={handleSignOut}
                                >
                                        Sign Out
                                </button>
                        }
                </div>
        </div>
        </div>
    </main>
  )
}

export default NavBar