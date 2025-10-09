import { ChevronDown  } from "lucide-react";
import useChatStore from "../store/useChatStore";
import toast from "react-hot-toast";
const HoverDropdown = ({message}) => {
  const {deleteMessage} = useChatStore()

  return (
    <div className="relative flex group">
      <button className="h-9 w-9 rounded-full flex items-center justify-center bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-sm">
        <ChevronDown className="inline-block" />
      </button>

      <div className="absolute right-0 hidden group-hover:block text-sm mt-2 rounded-md w-36 border border-black/5 bg-white p-1 shadow-xl dark:border-white/10 dark:bg-gray-900">
        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" onClick={()=>{deleteMessage(message)}}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default HoverDropdown;

