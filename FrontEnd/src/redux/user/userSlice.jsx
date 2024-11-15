import { createSlice } from "@reduxjs/toolkit";


const initialState={
    currentUser:null,
    allUsers:[],
    allChats:[],
    selectedChat:null,
    error:null,
    loading:false,
}

const userSlice=createSlice({
   name:"user",
   initialState,
   reducers:{
    signInStart:(state)=>{
        state.loading=true,
        state.error=null
    },
    signInSuccess:(state,action)=>{
        state.currentUser=action.payload,
        state.loading=false,
        state.error=null
    },
    signInFailure:(state,action)=>{
        state.error=action.payload,
        state.loading=false
    },
    updateStart:(state)=>{
        state.loading=true,
        state.error=null
    },
    updateSuccess:(state,action)=>{
        state.loading=false,
        state.error=null,
        state.currentUser=action.payload
    },
    updateFailure:(state,action)=>{
        state.error=action.payload,
        state.loading=false 
    },
    deleteStart:(state)=>{
        state.loading=true,
        state.error=null
    },
    deleteSuccess:(state)=>{
        state.loading=false,
        state.error=null
    },
    deleteFailure:(state,action)=>{
        state.error=action.payload,
        state.loading=false 
    },
    signoutSuccess:(state)=>{
        state.loading=false,
        state.error=null,
        state.currentUser=null
    },
    setAllUsers:(state,action)=>{
        state.allUsers=action.payload,
        state.loading=false,
        state.error=null
    },
    setAllChats:(state,action)=>{
        state.allChats=action.payload,
        state.loading=false,
        state.error=null
    },
    setSelectedChat:(state,action)=>{
        state.selectedChat=action.payload;
    },
    hideLoading:(state)=>{
        state.loading=false,
        state.error=null
    },
   },
});

export const 
{
signInStart,
signInSuccess,
signInFailure,
updateStart,
updateSuccess,
updateFailure,
deleteStart,
deleteSuccess,
deleteFailure,
signoutSuccess,
setAllUsers,
setAllChats,
setSelectedChat,
hideLoading
}
=userSlice.actions;
export default userSlice.reducer;