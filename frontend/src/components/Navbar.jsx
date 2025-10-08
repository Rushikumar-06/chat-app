import { Link } from "react-router-dom";
import useAuthStore from "../store/UseAuthStore";
import { MessageSquare, User, LogOut, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
	const { Logout, authUser } = useAuthStore();
	const [isDark, setIsDark] = useState(() => {
		if (typeof window === "undefined") return true;
		const ls = localStorage.getItem("theme");
		if (ls === "dark") return true;
		if (ls === "light") return false;
		return true; 
	});

	useEffect(() => {
		document.documentElement.classList.toggle("dark", isDark);
		localStorage.setItem("theme", isDark ? "dark" : "light");
	}, [isDark]);

	const toggleTheme = () => setIsDark((d) => !d);

	return (
		<div className="fixed w-full top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-lg dark:border-white/10 dark:bg-gray-900/40">
      <div className="  px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="size-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
              </div>
							<span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200">
                ChatApp
              </span>
            </Link>
          </div>

					<div className="flex items-center space-x-2">
						<button
							onClick={toggleTheme}
							aria-label="Toggle theme"
							className="flex items-center justify-center rounded-xl p-2 text-gray-700 hover:bg-gray-100/70 transition-all duration-200 dark:text-gray-200 dark:hover:bg-white/10"
						>
							{isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
						</button>
            {authUser ? (
              <>
                <Link
                  to="/profile"
									className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium  text-white hover:text-gray-900 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 backdrop-blur-sm"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                
               

								<button
                  onClick={Logout}
									className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50/50 transition-all duration-300 backdrop-blur-sm dark:hover:bg-red-400/10"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
              
              </>
                
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;