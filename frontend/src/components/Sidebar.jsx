import { useEffect, useState } from "react";
import useChatStore  from "../store/UseChatStore";
import  useAuthStore  from "../store/UseAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? (users || []).filter((user) => (onlineUsers || []).includes(user._id))
    : (users || []);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-[#D3D3D3] bg-[#F0F0F0] dark:border-[#424651] dark:bg-[#282c34] flex flex-col transition-all duration-200">
      <div className="border-b border-[#D3D3D3] dark:border-[#424651] w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="h-4 w-4 rounded border-[#D3D3D3] text-[#A9A9A9] focus:ring-[#A9A9A9] dark:border-[#424651] dark:text-[#9ca2ad]"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-[#A9A9A9] dark:text-[#9ca2ad]">({(onlineUsers || []).length - 1} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers?.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3 transition-colors
              hover:bg-[#FFFFFF] dark:hover:bg-[#424651]
              ${selectedUser?._id === user._id ? "bg-[#FFFFFF] ring-1 ring-[#D3D3D3] dark:bg-[#424651] dark:ring-[#9ca2ad]/30" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {(onlineUsers || []).includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-[#A9A9A9] dark:text-[#9ca2ad]">
                {(onlineUsers || []).includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {(filteredUsers || []).length === 0 && (
          <div className="text-center text-[#A9A9A9] py-4 dark:text-[#9ca2ad]">No online users</div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;