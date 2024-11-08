import { AllRoutes } from "./pages/AllRoutes"
//import {Toaster} from "react-hot-toast"
import { ToastContainer,} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <main className="h-screen mt-[-20px] bg-gradient-to-b from-teal-700  to-sky-600 ">
     <ToastContainer />
      <AllRoutes />
      App
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    </main>
  )
}

export default App