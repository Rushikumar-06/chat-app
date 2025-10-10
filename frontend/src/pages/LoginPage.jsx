import {useState} from "react"
import useAuthStore from "../store/UseAuthStore";
import {MessageSquare,User,Mail,Lock,EyeOff,Eye,Loader2,Sparkles} from "lucide-react"
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
function LoginPage() {
  const [showPassword,setShowPassword] = useState(false);
  const [formData,setFormData] = useState({
    email:"",
    password:""
  });
  const {Login,isLoggingIn} = useAuthStore();
  const validateForm = () => {
    if( !formData.email || !formData.password){
      toast.error("All the feilds are required")
      return false
    }
    return true
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if(success){
      Login(formData)
    }
  }
  return (
    <div className="min-h-screen pt-16 bg-[#F0F0F0] text-gray-900 dark:bg-[#0b141a] dark:text-gray-100">
      <div className="grid lg:grid-cols-2 min-h-screen">
        <AuthImagePattern
          title="Welcome back to the community!"
          subtitle="Log in to share your moments and stay connected with the people you care about."
        />
        
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-4 group">
                <div className="size-16 rounded-2xl bg-[#778899] flex items-center justify-center shadow">
                  <MessageSquare className="size-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    Welcome back
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">Login to your account</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl shadow p-8 border bg-[#FFFFFF] border-[#D3D3D3] dark:bg-[#111b21] dark:border-[#2a3942]">
              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Email
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="size-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                    </div>
                    <input
                      type="email"
                      className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#778899] focus:border-transparent bg-[#F0F0F0] border border-[#D3D3D3] text-gray-900 placeholder-gray-500 dark:bg-[#202c33] dark:border-[#2a3942] dark:text-gray-100 dark:placeholder-gray-400"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="size-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-12 pr-12 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#778899] focus:border-transparent bg-[#F0F0F0] border border-[#D3D3D3] text-gray-900 placeholder-gray-500 dark:bg-[#202c33] dark:border-[#2a3942] dark:text-gray-100 dark:placeholder-gray-400"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-purple-600 transition-colors dark:text-gray-400 dark:hover:text-purple-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="size-5" />
                      ) : (
                        <Eye className="size-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 px-6 bg-[#778899] hover:bg-[#778899]/80 text-white font-semibold rounded-xl shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                     
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>

              <div className="text-center mt-6">
                <span className="text-gray-700 dark:text-gray-300">Don't have an account? </span>
                <Link 
                  to="/signup" 
                  className="font-semibold transition-colors hover:underline text-[#778899] hover:text-[#778899]/80 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
