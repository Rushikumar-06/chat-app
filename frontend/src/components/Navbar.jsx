import { Link } from "react-router-dom";
import useAuthStore from "../store/UseAuthStore";
import { MessageSquare, Settings, User, LogOut } from "lucide-react";

const Navbar = () => {
  const { Logout, authUser } = useAuthStore();

  return (
    <div className="bg-white/5 backdrop-blur-lg border-b border-white/20 fixed w-full top-0 z-50">
      <div className="  px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="size-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                ChatApp
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            {authUser ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                
                <Link
                  to="/settings"
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </Link>

                <button
                  onClick={Logout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50/50 transition-all duration-300 backdrop-blur-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-6 py-2 mr-2 text-sm font-medium text-white hover:text-gray-900 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl transition-all duration-300 backdrop-blur-sm"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;