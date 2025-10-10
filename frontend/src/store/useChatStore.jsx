import { create } from "zustand";
import toast from "react-hot-toast";
import  axiosInstance  from "../lib/axios";
import  useAuthStore  from "./UseAuthStore";

const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSendMessageLoading: false,
  showDropDown: { show: false, messageId: null },
  isDeletingMessage: false,


  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    set({ isSendMessageLoading: true });
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSendMessageLoading: false });
    }
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  setShowDropDown: (showDropDown,messageId) => set({ showDropDown: { show: showDropDown, messageId: messageId } }),
 

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    
    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },


   deleteMessage:async(message) => {
    set({ isDeletingMessage: true });
    
    try {
      await axiosInstance.delete("/messages/delete/message",{data:message});
       set({ messages: get().messages.filter((msg) => msg._id !== message._id) });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isDeletingMessage: false });
    }
  },
  subscribeToDeletedMessages: () => {
     const { selectedUser } = get();
    if (!selectedUser) return;
     
    const socket = useAuthStore.getState().socket;

    socket.on("deleteMessage", ({ messageId, senderId }) => {
      const isMessageDeleteFromSelectedUser = senderId === selectedUser._id;
      if (!isMessageDeleteFromSelectedUser) return;
      set({
        messages: get().messages.filter((msg) => msg._id !== messageId),
      });
    });
  },
  unsubscribeFromDeletedMessages:()=>{
    const socket = useAuthStore.getState().socket;
    socket.off("deleteMessage");
  }

  
}));

export default useChatStore;