import { X } from "lucide-react";
import  useAuthStore  from "../store/UseAuthStore";
import  useChatStore  from "../store/UseChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-3 border-b border-black/5 dark:bg-[#2b2b2b] dark:border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} className="size-full object-cover" />
          </div>
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <button onClick={() => setSelectedUser(null)} className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;