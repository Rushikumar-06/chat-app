import  useChatStore  from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen text-gray-900 dark:text-gray-100 bg-emerald-50 dark:bg-[#0b141a]">
      <div className="w-full h-[100vh] pt-16">
        <div className="flex h-full overflow-hidden">
          <Sidebar />
          <div className="min-w-0 flex-1 flex flex-col">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;