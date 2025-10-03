import { useEffect, useState } from "react";
import { assets, dummyPostsData } from "../assets/assets";
import SkeletonLoader from "../components/SkeletonLoader";
import StoriesBar from "../components/StoriesBar";
import PostCard from "../components/PostCard";
import RecentMessages from "../components/RecentMessages";
import { MessageCircleHeart } from "lucide-react";
import { Link } from "react-router-dom";
import CreatePost from "../components/CreatePost";
import { useUser } from "@clerk/clerk-react";

export default function Home() {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const fetchFeeds = async () => {
    setFeeds(dummyPostsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return !loading ? (
    <div
      className="relative h-full overflow-y-scroll no-scrollbar py-12 xl:pr-5 flex
      items-start justify-center xl:gap-8"
    >
      {/* Stories and post list */}
      <div>
        <StoriesBar />

        <CreatePost profile_picture={user.imageUrl} />

        <div>
          {feeds.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      {/* Right sidebar */}
      <div className="max-xl:hidden sticky top-0">
        <div className="max-w-xs bg-white text-xs p-4 rounded inline-flex flex-col gap-2 shadow font-medium">
          <h3 className="text-slate-900 font-semibold">Sponsored</h3>
          <img
            loading="lazy"
            src={assets.sponsored_img}
            alt="sponsored image"
            className="w-full h-full rounded"
          />
          <p className="text-slate-700">Power Redefined</p>
          <p className="text-slate-500">
            Experience the future with myPhone69 Pro Max
          </p>

          <button className="p-2 rounded font-semibold text-sm text-white bg-blue-500 hover:bg-blue-600 cursor-pointer">
            Buy Now
          </button>
        </div>

        <RecentMessages />
      </div>

      {/* Floating message button */}
      <Link
        to={"/inbox"}
        className="fixed bottom-8 right-8 bg-white shadow-lg p-4 md:px-15 md:py-4 rounded-full border border-neutral-200 text-slate-800 flex items-center gap-2 font-medium"
      >
        <MessageCircleHeart />
        <span className="hidden md:inline">Messages</span>
      </Link>
    </div>
  ) : (
    <SkeletonLoader />
  );
}
