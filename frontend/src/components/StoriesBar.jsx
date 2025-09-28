import { useEffect, useState } from "react";
import { dummyStoriesData } from "../assets/assets";
import { Plus } from "lucide-react";
import StoryModal from "./StoryModal";

export default function StoriesBar() {
  const [stories, setStories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewStory, setViewStory] = useState(null);

  const fetchStories = async () => {
    setStories(dummyStoriesData);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div className="w-screen sm:w-[calc(100vw - 240px)] lg:max-w-2xl no-scrollbar overflow-x-auto px-4">
      <div className="flex items-center gap-4 py-2">
        {/* Add Story */}
        <div
          onClick={() => setShowModal(true)}
          className="flex flex-col items-center gap-1 cursor-pointer"
        >
          {/* Circle with plus */}
          <div className="w-[6.5rem] h-[6.5rem] rounded-full border-2 border-dashed border-blue-400 bg-gradient-to-b from-blue-100 to-white flex items-center justify-center transition-all duration-200 active:scale-95">
            <div className="size-12 bg-blue-500 rounded-full flex items-center justify-center">
              <Plus className="w-7 h-7 text-white" />
            </div>
          </div>

          {/* Label */}
          <p className="text-xs font-medium text-slate-700 text-center">
            Add Story
          </p>
        </div>

        {/* Story cards */}
        {stories.map((story, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-1 cursor-pointer"
          >
            {/* Story Ring */}
            <div
              className="p-[3.5px] rounded-full 
                 [background:conic-gradient(from_180deg,#f58529,#dd2a7b,#8134af,#515bd4,#f58529)] 
                 transition-all duration-200 active:scale-95"
            >
              {/* Story inside */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-white">
                <img
                  src={story.user.profile_picture}
                  alt="profile picture"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Username */}
            <p className="text-xs font-medium text-gray-700 truncate max-w-[4rem] text-center">
              {story.user.username}
            </p>
          </div>
        ))}
      </div>

      {/* Add story modal */}
      {showModal && (
        <StoryModal setShowModal={setShowModal} fetchStories={fetchStories} />
      )}
    </div>
  );
}
