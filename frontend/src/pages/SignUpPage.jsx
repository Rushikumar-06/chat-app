import {useState} from "react"
import useAuthStore from "../store/UseAuthStore";
import {MessageSquare,User,Mail,Lock,EyeOff,Eye,Loader2,Sparkles} from "lucide-react"
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
function signUpPage() {
  const [showPassword,setShowPassword] = useState(false);
  const [conformPassword,setConformPassword] = useState("")
  const [formData,setFormData] = useState({
    fullName:"",
    email:"",
    password:""
  });
  const {signUp,isSigningUp} = useAuthStore();
  const validateForm = () => {
    if(!formData.fullName || !formData.email || !formData.password){
      toast.error("All the feilds are required")
      return false
    }
    if(formData.password.length < 6){
      toast.error("Password must be atleast 6 characters")
      return false
    }
    if(formData.password !== conformPassword){
      toast.error("Passwords did not match")
      return false
    }
    if(!/\S+@\S+\.\S+/.test(formData.email)){
      toast.error("Invalid email address")
      return false
    }
    return true
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if(success){
      signUp(formData)
    }
  }
  return (
    <div className="min-h-screen relative overflow-hidden  bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 grid lg:grid-cols-2 min-h-screen">
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
        
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-4 group">
                <div className="relative">
                  <div className="size-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <MessageSquare className="size-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 size-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Sparkles className="size-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
                    Create Account
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">Get started with your free account</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl shadow-2xl p-8 backdrop-blur-lg border bg-white/80 border-black/10 dark:bg-white/10 dark:border-white/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Full Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="size-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm bg-white border border-black/10 text-gray-900 placeholder-gray-500 dark:bg-white/10 dark:border-white/20 dark:text-white dark:placeholder-gray-400"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                </div>

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
                      className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm bg-white border border-black/10 text-gray-900 placeholder-gray-500 dark:bg-white/10 dark:border-white/20 dark:text-white dark:placeholder-gray-400"
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
                      className="w-full pl-12 pr-12 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm bg-white border border-black/10 text-gray-900 placeholder-gray-500 dark:bg-white/10 dark:border-white/20 dark:text-white dark:placeholder-gray-400"
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
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Conform Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="size-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-12 pr-12 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm bg-white border border-black/10 text-gray-900 placeholder-gray-500 dark:bg-white/10 dark:border-white/20 dark:text-white dark:placeholder-gray-400"
                      placeholder="••••••••"
                      value={conformPassword}
                      onChange={(e) => setConformPassword( e.target.value )}
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
                  className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  disabled={isSigningUp}
                >
                  {isSigningUp ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                       
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="text-center mt-6">
                <span className="text-gray-700 dark:text-gray-300">Already have an account? </span>
                <Link 
                  to="/login" 
                  className="font-semibold transition-colors hover:underline text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default signUpPage
