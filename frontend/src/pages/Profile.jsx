import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyPostsData, dummyUserData } from "../assets/assets";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";
import UserProfileInfo from "../components/UserProfileInfo";
import { Bookmark, Grid3X3, Heart, Image, MessageCircle } from "lucide-react";

export default function Profile() {
  const { profileId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [showEdit, setShowEdit] = useState(false);

  const icons = {
    posts: <Grid3X3 />,
    media: <Image />,
    saved: <Bookmark />,
  };

  const fetchUser = async () => {
    setUser(dummyUserData);
    setPosts(dummyPostsData);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return user ? (
    <div className="relative h-full overflow-y-scroll bg-white p-6">
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
            posts={posts}
            profileId={profileId}
            setShowEdit={setShowEdit}
          />
        </div>

        {/* Tabs */}
        <div className="my-8">
          <div className="max-w-3xl mx-auto flex justify-around border-b border-gray-300">
            {["posts", "media", "saved"].map((tab) => (
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
          {activeTab === "posts" && (
            <div className="flex flex-col items-center">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
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
                    <Link
                      target="_blank"
                      to={image}
                      key={idx}
                      className="relative group block"
                    >
                      <img
                        src={image}
                        alt="post"
                        className="w-full aspect-square object-cover"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex justify-center items-center gap-4 text-white font-medium bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300">
                        <div className="flex gap-1 items-center">
                          <Heart className="w-5 h-5" />{" "}
                          {post.likes_count.length}
                        </div>
                        <div className="flex gap-1 items-center">
                          <MessageCircle className="w-5 h-5" /> 10
                        </div>
                      </div>
                    </Link>
                  ))
                )}
            </div>
          )}
        </div>
      </div>

      {/* Edit profile modal */}
      {showEdit && <p>Show profile edit</p>}
    </div>
  ) : (
    <Loading />
  );
}
