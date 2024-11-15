import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { setAllChats,signInStart,setAllUsers,hideLoading } from "../redux/user/userSlice";
import { fetchAllUsers } from "../customHooks/FetchApi";
import { fetchAllUserChats } from "../customHooks/FetchApi";

const ProtectedRoutes = ({children}) => {
        const currentUser=useSelector(state=>state.user.currentUser);
        const navigate=useNavigate();
        const dispatch=useDispatch();

        useEffect(()=>{
          if(currentUser){
            const getAllUsers=async ()=>{
              try{
                dispatch(signInStart())
                const response=await fetchAllUsers();
                if(response.length>0){
                  console.log("users",response);
                  const usersExceptCurrentUser=response.filter(user=>user._id!==currentUser._id);
                  dispatch(hideLoading())
                  dispatch(setAllUsers(usersExceptCurrentUser))
                }
              }catch(error){
                console.log(error.message)
                dispatch(hideLoading());
                navigate('/sign_in')
              }
            }
            const getUserChats=async()=>{
              try{
                const response=await fetchAllUserChats();
                if(response){
                  dispatch(setAllChats(response.data));
                }
              }catch(error){
                console.log(error)
              }
            }
    
            getAllUsers();
            getUserChats();
          }else{
            navigate('/sign_in')
          }
          
        },[currentUser,navigate,dispatch])
        
  return (
    <div>
      {children}
    </div>
  )
}

export default ProtectedRoutes