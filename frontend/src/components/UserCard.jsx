import { Verified, Plus } from "lucide-react";
import { dummyUserData } from "../assets/assets";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UserCard({ user }) {
  const currentUser = useSelector((state) => state.user.value);

  const handleFollow = async () => {};

  const handleConnectionRequest = async () => {};

  return (
    <div className="w-full sm:w-[280px] bg-white rounded-xl shadow-sm">
      {/* Cover + Profile */}
      <div className="relative">
        <img
          loading="lazy"
          src={user.cover_photo}
          alt="cover"
          className="w-full h-24 object-cover rounded-t-xl"
        />
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <Link to={`/profile/${user._id}`}>
            <img
              src={user.profile_picture}
              alt={user.full_name}
              className="w-16 h-16 rounded-full border-4 border-white object-cover shadow"
            />
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="pt-10 px-4 pb-4 text-center">
        <h2 className="text-base font-semibold text-gray-900 flex items-center justify-center gap-1">
          {user.full_name}
          {user.is_verified && <Verified className="w-4 h-4 text-blue-500" />}
        </h2>
        <p className="text-xs text-gray-500">@{user.username}</p>

        {/* Bio trimmed */}
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{user.bio}</p>

        {/* Stats */}
        <div className="flex justify-center gap-6 mt-4 text-xs">
          <div>
            <p className="font-semibold">{user.posts.length}</p>
            <p className="text-gray-500">Posts</p>
          </div>
          <div>
            <p className="font-semibold">{user.followers.length}</p>
            <p className="text-gray-500">Followers</p>
          </div>
          <div>
            <p className="font-semibold">{user.following.length}</p>
            <p className="text-gray-500">Following</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-2 mt-5">
          {/* Follow / Following */}
          <button
            onClick={handleFollow}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg active:scale-95 cursor-pointer transition
      ${
        currentUser?.following.includes(user._id)
          ? "bg-gray-100 text-gray-800 hover:bg-gray-200" // Following style
          : "bg-blue-500 text-white hover:bg-blue-600" // Follow style
      }`}
          >
            {currentUser?.following.includes(user._id) ? "Following" : "Follow"}
          </button>

          {/* Connection / Message */}
          <button
            onClick={handleConnectionRequest}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg active:scale-95 cursor-pointer transition
      ${
        currentUser?.connections.includes(user._id)
          ? "bg-blue-500 text-white hover:bg-blue-600" // Message style
          : "bg-gray-100 text-gray-800 hover:bg-gray-200" // Request style
      }`}
          >
            {currentUser?.connections.includes(user._id) ? (
              <span>Message</span>
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
