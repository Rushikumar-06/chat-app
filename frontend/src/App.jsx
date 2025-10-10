import Navbar from "./components/Navbar"
import {Routes,Route, Navigate} from "react-router-dom"
import HomePage from "./pages/homePage"
import SignUpPage from "./pages/signUpPage.jsx"
import LoginPage from "./pages/loginPage.jsx"
import ProfilePage from "./pages/profilePage"
import useAuthStore from "./store/UseAuthStore"
import { useEffect } from "react"
import axiosInstance from "./lib/axios"
import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast"
function App() {
  const {checkAuth,isCheckingAuth,authUser} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return <div className="flex justify-center items-center h-screen ">
         <Loader className="size-10 animate-spin" />
      </div>
    
  }
  return (
    <div className="bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={authUser?<HomePage/> : <Navigate to="/login"/>}/>
        <Route path="/signup" element={!authUser?<SignUpPage/> : <Navigate to="/"/>}/>
        <Route path="/login" element={!authUser?<LoginPage/> : <Navigate to="/"/>}/>
        <Route path="/profile" element={authUser?<ProfilePage/> : <Navigate to="/login"/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
