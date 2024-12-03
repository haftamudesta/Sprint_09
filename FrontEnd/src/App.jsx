//import { AllRoutes } from "./pages/AllRoutes";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import ProtectedRoutes from './components/ProtectedRoutes';
import { ToastContainer,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from "socket.io-client"

const socket=io.connect(`http://localhost:3001`, {
  reconnection:true,
  path: "/socket.io",
  transports: ['websocket','polling'],
  withCredentials: true,
  reconnectionAttempts: 5,
  wssEngine:['ws','wsss'],
  allowEIO3:true,
})

const App = () => {
  return (
    <main className="h-screen mt-[-20px] bg-gradient-to-b from-teal-700  to-purple-700 text-black ">
     <ToastContainer />
     <BrowserRouter>
        <Routes>
        <Route path='/' element={<ProtectedRoutes><Home/></ProtectedRoutes>} />
        <Route path='/sign_in' element={<SignIn/>} />
        <Route path='/sign_up' element={<SignUp />} />
        </Routes>
        </BrowserRouter>
    </main>
  )
}

export default App