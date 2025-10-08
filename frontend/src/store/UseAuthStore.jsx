import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async() => {
    try {
        const res = await axiosInstance.get("/auth/check");
        set({ authUser: res.data });
    } catch (error) {
        set({ authUser: null });
    }
    finally {
        set({ isCheckingAuth: false });
    }
  },
  signUp: async (Data) => {
    set({isSigningUp:true})
    try {
      const res= await axiosInstance.post("/auth/signup",Data)
      set({authUser:res.data})
      toast.success("Account created successfully")  
      
    } catch (error) {
        toast.error(error.response.data.message)
    } 
    finally {
      set({isSigningUp:false})
    }
    },
    Login:async(Data)=>{
      set({isLoggingIn:true})
      try {
        const res = await axiosInstance.post("/auth/login",Data)
        set({authUser:res.data})
        toast.success("Logged in successfully")
      } catch (error) {
        toast.error(error.response.data.message)
      }
      finally {
      set({isLoggingIn:false})
    }
    },
    Logout: async()=>{
      try {
        await axiosInstance.post("/auth/logout");
        set({ authUser: null });
        toast.success("Logged out successfully");
      } catch (err) {
        toast.error(err.response.data.message)
      }
    },
    updateProfile: async(data)=>{
      set({isUpdatingProfile:true})
      try {
        const res = await axiosInstance.put("/auth/update-profile",data)
        set({authUser:res.data})
        toast.success("updated profile pic")
      } catch (error) {
        toast.error(error.response.data.message)
      }
      finally{
        set({isUpdatingProfile:false})
      }
    }
}));

export default useAuthStore;
 