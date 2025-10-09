const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => {
        const isLeft = idx % 2 === 0;
        return (
          <div key={idx} className={`flex w-full ${isLeft ? "justify-start" : "justify-end"}`}>
            <div className={`flex items-end gap-2 ${isLeft ? "flex-row-reverse" : "flex-row"}`}>
              {/* Avatar */}
              <div className="size-10 rounded-full bg-gray-200 animate-pulse dark:bg-gray-800" />
              {/* Bubble */}
              <div className="space-y-2">
                <div className="h-3 w-12 rounded bg-gray-200 animate-pulse dark:bg-gray-800" />
                <div className="h-16 w-[200px] rounded-2xl bg-gray-200 animate-pulse dark:bg-gray-800" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;