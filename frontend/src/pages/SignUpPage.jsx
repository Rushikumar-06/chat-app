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
    <div className="min-h-screen pt-16 bg-emerald-50 text-gray-900 dark:bg-[#0b141a] dark:text-gray-100">
      <div className="grid lg:grid-cols-2 min-h-screen">
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
        
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-4 group">
                <div className="size-16 rounded-2xl bg-emerald-600 flex items-center justify-center shadow">
                  <MessageSquare className="size-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">Get started with your free account</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl shadow p-8 border bg-slate-50 border-emerald-700/20 dark:bg-[#111b21] dark:border-[#2a3942]">
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
                      className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-50 border border-emerald-700/20 text-gray-900 placeholder-gray-500 dark:bg-[#202c33] dark:border-[#2a3942] dark:text-gray-100 dark:placeholder-gray-400"
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
                      className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-50 border border-emerald-700/20 text-gray-900 placeholder-gray-500 dark:bg-[#202c33] dark:border-[#2a3942] dark:text-gray-100 dark:placeholder-gray-400"
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
                      className="w-full pl-12 pr-12 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-50 border border-emerald-700/20 text-gray-900 placeholder-gray-500 dark:bg-[#202c33] dark:border-[#2a3942] dark:text-gray-100 dark:placeholder-gray-400"
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
                      className="w-full pl-12 pr-12 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-50 border border-emerald-700/20 text-gray-900 placeholder-gray-500 dark:bg-[#202c33] dark:border-[#2a3942] dark:text-gray-100 dark:placeholder-gray-400"
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
                  className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  className="font-semibold transition-colors hover:underline text-emerald-700 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300"
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
