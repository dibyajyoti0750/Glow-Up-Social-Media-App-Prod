import { useEffect, useState } from "react";
import { dummyPostsData } from "../assets/assets";
import SkeletonLoader from "../components/SkeletonLoader";
import StoriesBar from "../components/StoriesBar";
import PostCard from "../components/PostCard";

export default function Home() {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeeds = async () => {
    setFeeds(dummyPostsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return !loading ? (
    <div
      className="h-full overflow-y-scroll no-scrollbar py-2 xl:pr-5 flex
      items-start justify-center xl:gap-8"
    >
      {/* Stories and post list */}
      <div>
        <StoriesBar />

        <div>
          {feeds.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      {/* Right sidebar */}
      <div>
        <div>
          <h1>Sponsored</h1>
        </div>

        <h1>Recent messages</h1>
      </div>
    </div>
  ) : (
    <SkeletonLoader />
  );
}
