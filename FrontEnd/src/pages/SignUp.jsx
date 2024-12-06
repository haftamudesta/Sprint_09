import { Link,useNavigate } from "react-router-dom";
import {Alert, Button, Label, Spinner, TextInput} from "flowbite-react"
import { useState } from "react";
//import { Toaster } from "react-hot-toast";
import { toast } from 'react-toastify';
import { signInSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const [formData,setFormData]=useState({});
  const [errorMessage,setErrorMessage]=useState(null);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()})
  }
  
  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(!formData.name || !formData.email || !formData.password){
      return setErrorMessage("pelease fiel all the fields.");
    }
    try{
      setLoading(true);
      setErrorMessage(null);
        const res=await fetch('/api/users/createUser',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(formData),
          });
          const data=await res.json();
         if(data.success=== false){
          return setErrorMessage(data.message)
         }
         setLoading(false);
         if(res.ok){
          toast.success("You have Signed up Successfully")
          dispatch(signInSuccess(data))
          navigate('/sign_in');
         }
    }catch(error){
      setErrorMessage(error.message);
      setLoading(false);
    }
  }
  return (
    <div className='flex justify-center ml-8 mr-8 w-full mx-auto md:ml-40  '>
      <div className='flex  p-3 max-w-3xl  flex-col md:flex-row md:items-center gap-10'>
        <div className="flex-1 mt-20 bg-sky-300 md:w-3/4 p-4">
          <form className="flex flex-col " onSubmit={handleSubmit}>
            <div className="flex gap-2 flex-col">
              <Label value="Your Name:" className="flex text-start"/>
              <TextInput 
              type="text"
              placeholder="Name"
              id="name"
             onChange={handleChange} 
             className="flex text-start"
             />
            </div>
            <div className="flex gap-2 flex-col">
              <Label value="Your Email:" 
              className="flex text-start"
              />
              <TextInput 
              type="email"
              placeholder="user@gmail.com"
              id="email"
              onChange={handleChange}
              className="flex text-start"
              />
            </div>
            <div className="flex gap-2 flex-col">
              <Label value="Your password" 
              className="flex text-start"
              />
              <TextInput 
              type="password"
              placeholder="user password"
              id="password"
              onChange={handleChange}
              className="flex text-start"
              />
            </div>
            <Button className="bg-green-500 text-white w-[100px] px-2 py-0.5" type="submit" disabled={loading}>
              {loading?(
              <>
              <Spinner size="sm"/>
              <span className="p-3">loading...</span>
              </>):(
                 "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>have an account?</span>
            <Link to='/sign_in' className="text-blue-500">Sign In</Link>
          </div>
          <div>
          {errorMessage &&(
            <Alert className="mt-4" color="failure">
               {errorMessage}
            </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignUp