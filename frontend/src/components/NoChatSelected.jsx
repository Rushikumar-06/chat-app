import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-[#F0F0F0]/40 dark:bg-[#282c34]/20">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-[#D3D3D3]/20 flex items-center justify-center animate-bounce">
              <MessageSquare className="w-8 h-8 text-[#A9A9A9] dark:text-[#9ca2ad]" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold">Welcome to ChatApp!</h2>
        <p className="text-[#A9A9A9] dark:text-[#9ca2ad]">Select a conversation from the sidebar to start chatting</p>
      </div>
    </div>
  );
};

export default NoChatSelected;