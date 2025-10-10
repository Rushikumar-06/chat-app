import { ChevronDown  } from "lucide-react";
import useChatStore from "../store/UseChatStore";
import toast from "react-hot-toast";
const HoverDropdown = ({message}) => {
  const {deleteMessage} = useChatStore()

  return (
    <div className="relative flex group">
      <button className="h-9 w-9 rounded-full flex items-center justify-center bg-[#A9A9A9] text-white dark:bg-[#9ca2ad] dark:text-white shadow-sm">
        <ChevronDown className="inline-block" />
      </button>

      <div className="absolute right-0 hidden group-hover:block text-sm mt-2 rounded-md w-36 border border-[#D3D3D3] bg-white p-1 shadow-xl dark:border-[#424651] dark:bg-[#282c34]">
        <button className="w-full text-left px-3 py-2 rounded hover:bg-[#F0F0F0] dark:hover:bg-[#424651]" onClick={()=>{deleteMessage(message)}}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default HoverDropdown;

