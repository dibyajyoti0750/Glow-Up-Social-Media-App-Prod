import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";
import UserProfileInfo from "../components/UserProfileInfo";
import {
  Bookmark,
  Camera,
  Grid3X3,
  Heart,
  Image,
  MessageCircle,
} from "lucide-react";
import ProfileModal from "../components/ProfileModal";
import { useSelector } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function Profile() {
  const currentUser = useSelector((state) => state.user.value);
  const { getToken } = useAuth();

  const { profileId } = useParams();
  const [user, setUser] = useState(null);
  const [profileFeeds, setProfileFeeds] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [showEdit, setShowEdit] = useState(false);

  const icons = {
    posts: <Grid3X3 />,
    media: <Image />,
    saved: <Bookmark />,
  };

  const tabs = profileId ? ["posts", "media"] : ["posts", "media", "saved"];

  const fetchUser = async (profileId) => {
    try {
      const { data } = await api.post(
        `/api/user/profiles`,
        { profileId },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        setUser(data.profile);
        setProfileFeeds(data.posts);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const fetchSavedPosts = async () => {
    try {
      const { data } = await api.get("/api/user/saved", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setSavedPosts(data.savedPosts);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (profileId) {
      fetchUser(profileId);
    } else {
      fetchUser(currentUser._id);
    }
  }, [profileId, currentUser]);

  useEffect(() => {
    if (activeTab === "saved" && !profileId) {
      fetchSavedPosts();
    }
  }, [activeTab, profileId]);

  return user ? (
    <div className="relative h-full overflow-y-scroll bg-white p-3">
      <div className="max-w-4xl mx-auto">
        {/* Profile card */}
        <div className="rounded-xl overflow-hidden">
          {/* Cover photo */}
          <div className="h-40 md:h-56 bg-linear-to-r from-blue-200 via-blue-400 to-blue-600">
            {user.cover_photo && (
              <img
                loading="lazy"
                src={user.cover_photo}
                alt="cover photo"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* User info */}
          <UserProfileInfo
            user={user}
            posts={profileFeeds}
            profileId={profileId}
            setShowEdit={setShowEdit}
          />
        </div>

        {/* Tabs */}
        <div className="my-8">
          <div className="max-w-3xl mx-auto flex justify-around border-b border-gray-300">
            {tabs.map((tab) => (
              <button
                title={tab}
                onClick={() => setActiveTab(tab)}
                key={tab}
                className={`px-10 pb-2 transition-colors cursor-pointer focus:outline-none ${
                  activeTab === tab ? "border-b-2 text-black" : "text-gray-500"
                }`}
              >
                {icons[tab]}
              </button>
            ))}
          </div>

          {/* Posts */}
          {!profileFeeds.length ? (
            <div className="flex flex-col gap-5 justify-center items-center p-8 sm:p-12 md:p-16 text-gray-300">
              <div className="h-32 w-32 flex justify-center items-center rounded-full border-2">
                <Camera className="h-16 w-16" />
              </div>
              <p className="text-xl font-semibold text-center">No posts yet</p>
            </div>
          ) : (
            <div>
              {activeTab === "posts" && (
                <div className="flex flex-col items-center">
                  {profileFeeds.map((post) => (
                    <PostCard
                      key={post._id}
                      post={post}
                      setFeeds={setProfileFeeds}
                    />
                  ))}
                </div>
              )}

              {/* Media */}
              {activeTab === "media" && (
                <div className="grid grid-cols-3 w-full">
                  {posts
                    .filter((post) => post.image_urls.length > 0)
                    .map((post) =>
                      post.image_urls.map((image, idx) => (
                        <div
                          key={idx}
                          onClick={() => window.open(image, "_blank")}
                          className="relative group block cursor-pointer"
                        >
                          <img
                            src={image}
                            alt="post"
                            width={400}
                            height={300}
                            className="w-full aspect-square object-cover"
                          />
                          {/* Hover overlay */}
                          <div className="absolute inset-0 flex justify-center items-center gap-4 text-white font-medium bg-black/60 opacity-0 group-hover:opacity-100 transition duration-200">
                            <div className="flex gap-1 items-center">
                              <Heart className="w-5 h-5" />
                              {post.likes_count.length}
                            </div>
                            <div className="flex gap-1 items-center">
                              <MessageCircle className="w-5 h-5" />
                              {post.comments.length}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                </div>
              )}

              {/* Saved */}
              {activeTab === "saved" && (
                <div>
                  {savedPosts.map((post) => (
                    <PostCard key={post._id} post={post} setFeeds={setFeeds} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit profile modal */}
      {showEdit && <ProfileModal setShowEdit={setShowEdit} />}
    </div>
  ) : (
    <Loading />
  );
}
