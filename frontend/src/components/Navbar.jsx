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
			<div className="fixed w-full top-0 z-50 border-b border-[#D3D3D3] bg-[#778899] text-white dark:border-[#424651] dark:bg-[#282c34] dark:text-white">
      <div className="  px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="size-10 rounded-xl bg-gradient-to-br from-[#778899] to-[#778899] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg dark:from-[#424651] dark:to-[#9ca2ad]">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
              </div>
							<span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90 dark:from-white dark:to-white/90">
                ChatApp
              </span>
            </Link>
          </div>

					<div className="flex items-center space-x-2">
						<button
							onClick={toggleTheme}
							aria-label="Toggle theme"
								className="flex items-center justify-center rounded-xl p-2 text-white/90 hover:bg-[#778899]/80 transition-all duration-200 dark:text-white dark:hover:bg-[#424651]"
						>
							{isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
						</button>
            {authUser ? (
              <>
                <Link
                  to="/profile"
									className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-[#778899] bg-white hover:bg-[#F0F0F0] transition-all duration-200 dark:bg-[#424651] dark:text-white dark:hover:bg-[#9ca2ad]"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                
               

								<button
                  onClick={Logout}
									className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-white/90 hover:bg-[#778899]/80 transition-all duration-200 dark:text-white dark:hover:bg-[#424651]"
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