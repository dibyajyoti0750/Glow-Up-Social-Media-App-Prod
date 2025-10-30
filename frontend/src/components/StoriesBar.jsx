import { useEffect, useRef, useState } from "react";
import { ChevronRight, CopyPlus } from "lucide-react";
import StoryModal from "./StoryModal";
import StoryViewer from "./StoryViewer";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function StoriesBar() {
  const { getToken } = useAuth();
  const currUser = useSelector((state) => state.user.value);

  const [stories, setStories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewStory, setViewStory] = useState(null);

  const storyContainerRef = useRef(null);
  const [showScrollArrow, setShowScrollArrow] = useState(false);

  const fetchStories = async () => {
    try {
      const token = await getToken();
      const { data } = await api.get("/api/story/get", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setStories(data.stories);
      } else {
        toast(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const incrementStoryView = async (storyId) => {
    try {
      const token = await getToken();
      const { data } = await api.post(
        "/api/story/views",
        { storyId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        fetchStories();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  useEffect(() => {
    const el = storyContainerRef.current;

    if (!el) return;

    const checkScroll = () => {
      // arrow disappears when scrolled to the end
      setShowScrollArrow(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };

    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [stories]);

  return (
    <div className="relative w-screen sm:w-[calc(100vw - 240px)] lg:max-w-3xl px-4">
      {showScrollArrow && (
        <button
          onClick={() => {
            if (storyContainerRef.current) {
              storyContainerRef.current.scrollBy({
                left: 200,
                behavior: "smooth",
              });
            }
          }}
          className="absolute top-16 right-5 -translate-y-1/2 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition cursor-pointer focus:outline-none"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      )}

      <div className="flex items-center gap-4 py-2">
        {/* Add Story */}
        <div
          onClick={() => setShowModal(true)}
          className="flex flex-col items-center gap-1 cursor-pointer"
        >
          {/* Circle with plus */}
          <div className="w-[6.5rem] h-[6.5rem] rounded-full border-2 border-dashed border-blue-400 bg-gradient-to-b from-blue-100 to-white flex items-center justify-center transition-all duration-200 active:scale-95">
            <CopyPlus className="w-8 h-8 text-blue-500" />
          </div>

          {/* Label */}
          <p className="text-xs font-medium text-slate-700 text-center">
            Add Story
          </p>
        </div>

        {/* Stories */}
        <div
          ref={storyContainerRef}
          className="flex flex-1 gap-4 overflow-auto no-scrollbar"
        >
          {stories.map((story, idx) => (
            <div
              onClick={() => {
                setViewStory(story);
                incrementStoryView(story._id);
              }}
              key={idx}
              className="flex flex-col items-center gap-1 cursor-pointer"
            >
              {/* Story Ring */}
              <div
                className={`p-1 rounded-full transition-all duration-200 active:scale-95 ${
                  story.views_count.includes(currUser._id)
                    ? "bg-gray-200"
                    : "[background:conic-gradient(from_180deg,#f58529,#dd2a7b,#8134af,#515bd4,#f58529)]"
                }`}
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
      </div>

      {/* Add story modal */}
      {showModal && (
        <StoryModal setShowModal={setShowModal} fetchStories={fetchStories} />
      )}

      {/* View story modal */}
      {viewStory && (
        <StoryViewer viewStory={viewStory} setViewStory={setViewStory} />
      )}
    </div>
  );
}
