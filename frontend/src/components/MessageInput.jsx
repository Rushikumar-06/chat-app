import { useRef, useState } from "react";
import useChatStore  from "../store/useChatStore";
import { Image, Send, X,Loader } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage, isSendMessageLoading } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setSelectedFile(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (isSendMessageLoading) return;
    if (!text.trim() && !selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("text", text.trim());
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      await sendMessage(formData);

      setText("");
      setSelectedFile(null);
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full border-t border-emerald-700/20 bg-emerald-50/80 dark:border-[#2a3942] dark:bg-[#111b21]">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-black/10 dark:border-white/10"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-200 flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full rounded-xl border border-emerald-700/20 bg-slate-50 px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-[#2a3942] dark:bg-[#202c33] dark:placeholder:text-gray-500"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          {!isSendMessageLoading ? (
            <button
              type="button"
              className={`hidden sm:flex h-10 w-10 items-center justify-center rounded-full transition-colors ${imagePreview ? "text-emerald-500" : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
              onClick={() => fileInputRef.current?.click()}
            >
              <Image size={20} />
            </button>
          ) : (
            <div className="flex items-center justify-center px-3">
              <Loader className="size-5 text-gray-400 animate-spin" />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="h-10 w-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition disabled:opacity-50"
          disabled={!text.trim() && !selectedFile}
        >
          <Send size={22} className="mx-auto" />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;