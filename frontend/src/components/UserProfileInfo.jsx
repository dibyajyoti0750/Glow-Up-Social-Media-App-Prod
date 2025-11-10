import { Calendar, Camera, MapPin, Verified } from "lucide-react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { fetchUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function UserProfileInfo({
  user,
  posts,
  profileId,
  setShowEdit,
}) {
  const currentUser = useSelector((state) => state.user.value);
  const isFollowing = currentUser.following.includes(user._id);
  const isConnected = currentUser.connections.includes(user._id);
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFollow = async () => {
    try {
      const { data } = await api.post(
        "/api/user/follow",
        { id: user._id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        toast.success(data.message);
        dispatch(fetchUser(await getToken()));
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUnfollow = async () => {
    try {
      const { data } = await api.post(
        "/api/user/unfollow",
        { id: user._id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        toast.success(data.message);
        dispatch(fetchUser(await getToken()));
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleConnectionRequest = async () => {
    if (isConnected) {
      return navigate(`/inbox/${user._id}`);
    }

    try {
      const { data } = await api.post(
        "/api/user/connect",
        { id: user._id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        toast.success(data.success);
      } else {
        toast(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="relative py-2 px-6 md:px-8 bg-white">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="h-32 w-32 border-4 border-white shadow-xl absolute -top-16 rounded-full overflow-hidden cursor-pointer group">
          <img
            src={user.profile_picture}
            alt="profile picture"
            className="w-full h-full object-cover"
          />

          {!profileId && (
            <div
              title="Change profile photo"
              onClick={() => setShowEdit(true)}
              className="flex items-center justify-center absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity duration-300"
            >
              <Camera className="text-white" />
            </div>
          )}
        </div>

        <div className="w-full pt-16 md:pt-0 md:pl-36">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-gray-900">
                {user.username}
              </h1>
              {user.is_verified && (
                <Verified className="w-5 h-5 text-sky-600" />
              )}
            </div>

            {/* Edit button if user is in his own profile */}
            {!profileId && (
              <button
                onClick={() => setShowEdit(true)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg font-medium text-sm transition-colors cursor-pointer"
              >
                Edit profile
              </button>
            )}
          </div>

          <div className="flex items-center gap-6 my-4">
            {[
              { label: "posts", value: posts.length },
              { label: "followers", value: user.followers.length },
              { label: "following", value: user.following.length },
            ].map((item) => (
              <div key={item.label}>
                <span className="sm:text-xl font-medium text-gray-900">
                  {item.value}
                  <span className="text-xs sm:text-sm text-gray-500 ml-2">
                    {item.label}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <div className="my-4 text-sm">
            <p className="font-medium">{user.full_name}</p>
            <p className="text-gray-800 text-sm max-w-md">{user.bio}</p>
          </div>

          <div className="flex items-center gap-5 text-sm text-gray-500 mt-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {user.location ? user.location : "Add location"}
            </span>

            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Joined
              <span className="font-medium">
                {moment(user.createdAt).fromNow()}
              </span>
            </span>
          </div>
        </div>
      </div>

      {profileId && (
        <div className="flex justify-between items-center gap-2 mt-8 md:mx-10">
          <button
            onClick={isFollowing ? handleUnfollow : handleFollow}
            className={`flex-1 py-2 text-sm font-medium rounded-lg active:scale-95 transition ${
              isFollowing
                ? "bg-gray-100 hover:bg-gray-200 text-black"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>

          <button
            onClick={handleConnectionRequest}
            className="flex-1 bg-gray-100 hover:bg-gray-200 py-2 text-sm font-medium rounded-lg active:scale-95 transition"
          >
            {isConnected ? "Message" : "Connect"}
          </button>
        </div>
      )}
    </div>
  );
}
