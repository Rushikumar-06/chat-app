import { X } from "lucide-react";
import  useAuthStore  from "../store/UseAuthStore";
import  useChatStore  from "../store/UseChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-3 border-b border-[#D3D3D3] dark:border-[#424651] dark:bg-[#424651]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} className="size-full object-cover" />
          </div>
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-[#A9A9A9] dark:text-[#9ca2ad]">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <button onClick={() => setSelectedUser(null)} className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-[#FFFFFF] dark:hover:bg-[#9ca2ad]/20">
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;