import { Verified, X } from "lucide-react";
import { useEffect, useState } from "react";
import moment from "moment";

export default function StoryViewer({ viewStory, setViewStory }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer, progressInterval;

    if (viewStory && viewStory.media_type !== "video") {
      setProgress(0);

      const duration = 10000;
      const setTime = 100;
      let elapsed = 0;

      progressInterval = setInterval(() => {
        elapsed += setTime;
        setProgress((elapsed / duration) * 100);
      }, setTime);

      // Close story after 10sec
      timer = setTimeout(() => {
        handleClose();
      }, duration);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [viewStory]);

  const handleClose = () => {
    setViewStory(null);
  };

  if (!viewStory) return null;

  const renderContent = () => {
    switch (viewStory.media_type) {
      case "image":
        return (
          <img
            src={viewStory.media_url}
            alt="story image"
            className="max-w-full max-h-screen object-contain"
          />
        );

      case "video":
        return (
          <video
            onEnded={handleClose}
            src={viewStory.media_url}
            className="max-h-screen"
            autoPlay
            controls={false}
          />
        );

      case "text":
        return (
          <div className="whitespace-pre-line w-full h-full flex items-center justify-center p-8 text-white text-2xl text-center">
            {viewStory.content}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 h-screen bg-black/90 z-50 flex items-center justify-center"
      style={{
        backgroundColor:
          viewStory.media_type === "text"
            ? viewStory.background_color
            : "#000000",
      }}
    >
      {/* Progress bar */}
      {viewStory.media_type !== "video" && (
        <div className="absolute top-0 left-0 w-full h-[1.5px] bg-neutral-500">
          <div
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* User info - top left */}
      <div className="absolute top-5 left-10 flex items-center space-x-2">
        <img
          src={viewStory.user?.profile_picture}
          alt="profile picture"
          className="size-10 sm:size-12 rounded-full object-cover"
        />
        <div className="flex flex-col text-white">
          <div className="flex items-center gap-1  font-medium">
            {viewStory.user?.username}
            {viewStory.user?.is_verified && <Verified size={18} />}
          </div>
          <span className="text-xs font-extralight">
            {moment(viewStory.createdAt).fromNow()}
          </span>
        </div>
      </div>

      {/* Close button */}
      <button
        title="close"
        onClick={handleClose}
        className="absolute top-5 right-10 text-white focus:outline-none"
      >
        <X className="w-8 h-8 hover:scale-110 transition cursor-pointer" />
      </button>

      {/* Content wrapper */}
      <div className="max-w-[100vw] max-h-[90vh] flex items-center justify-center">
        {renderContent()}
      </div>
    </div>
  );
}
