import  useChatStore  from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import  useAuthStore  from "../store/UseAuthStore";
import { formatMessageTime } from "../lib/utils";
import HoverDropdown from "./HoverDropdown";
import {Loader} from "lucide-react"

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    showDropDown,
    setShowDropDown,
    isDeletingMessage,
    subscribeToDeletedMessages,
    unsubscribeFromDeletedMessages
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

 useEffect(() => {
  if (!selectedUser?._id) return;

  getMessages(selectedUser._id);

  subscribeToMessages();
  subscribeToDeletedMessages();

  return () => {
    unsubscribeFromMessages();
    unsubscribeFromDeletedMessages();
  };
}, [
  selectedUser?._id,
  getMessages,
  subscribeToMessages,
  unsubscribeFromMessages,
  subscribeToDeletedMessages,
  unsubscribeFromDeletedMessages
]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="sticky top-0 z-10 bg-[#F0F0F0] backdrop-blur-xl dark:bg-[#282c34]/40">
            <ChatHeader />
          </div>
          <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-[#FFFFFF] dark:bg-[#282c34]">
          <div className="sticky top-0 bg-[#F0F0F0] backdrop-blur-xl dark:bg-[#424651]">
          <ChatHeader />
        </div>
          <div>
          <div className="p-4 space-y-4 " >
        {messages.map((message) => {
          const isOwn = message.senderId === authUser._id;
          const avatarSrc = isOwn ? (authUser.profilePic || "/avatar.png") : (selectedUser.profilePic || "/avatar.png");
          return (
            <div key={message._id} ref={messageEndRef} className={`flex w-full ${isOwn ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-end gap-2 ${isOwn ? "flex-row" : "flex-row-reverse"}`}
                onMouseEnter={() => setShowDropDown(true, message._id)}
                onMouseLeave={() => setShowDropDown(false, null)}
              >
                <div className={`${showDropDown.show && showDropDown.messageId === message._id && isOwn ? "block" : "hidden"}`}>
                  {isDeletingMessage ? (
                    <Loader className="h-3 w-3" />
                  ) : (
                    <HoverDropdown message={message} />
                  )}
                </div>
                <div className="flex items-end gap-2 max-w-[75vw] sm:max-w-[65vw]">
                  {/* Avatar */}
                  <div className={`shrink-0  ${message.senderId !== authUser._id ? "block":"hidden"}` }>
                    <img src={avatarSrc} alt="profile pic" className="size-10 rounded-full object-cover ring-1 ring-black/5 dark:ring-white/10" />
                  </div>
                  {/* Bubble */}
                  <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"}`}>
                    <time className="mb-1 text-xs text-[#A9A9A9] dark:text-gray-400">{formatMessageTime(message.createdAt)}</time>
                    <div className={`rounded-2xl px-3 py-2 shadow-sm ${
                      isOwn
                        ? "bg-[#d1f6be] text-black dark:bg-[#9ca2ad] dark:text-white"
                        : "bg-[#d4ebc6] text-black dark:bg-[#424651] dark:text-white"
                    }`}>
                      {message.image && (
                        <img src={message.image} alt="Attachment" className="sm:max-w-[220px] rounded-md mb-2" />
                      )}
                      {message.text && <p className="whitespace-pre-wrap break-words">{message.text}</p>}
                    </div>
                  </div>
                  <div className={`shrink-0  ${message.senderId === authUser._id ? "block":"hidden"}` }>
                    <img src={avatarSrc} alt="profile pic" className="size-10 rounded-full object-cover ring-1 ring-black/5 dark:ring-white/10" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        </div>
        </div>
        </div>
      
      <MessageInput />
    </div>
  );
};
export default ChatContainer;