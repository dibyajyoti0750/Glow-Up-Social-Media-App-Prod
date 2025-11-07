import { Verified, Plus, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { fetchUser } from "../features/user/userSlice";
import { useState } from "react";

export default function UserCard({ user }) {
  const currentUser = useSelector((state) => state.user.value);
  const [followModal, setFollowModal] = useState(false);

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
        setFollowModal(false);
        dispatch(fetchUser(await getToken()));
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleConnectionRequest = async () => {
    if (currentUser.connections.includes(user._id)) {
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
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="w-full bg-white rounded-xl shadow-sm transition p-4 flex items-center gap-4">
        {/* Profile Picture */}
        <Link to={`/profile/${user._id}`} className="flex-shrink-0">
          <img
            src={user.profile_picture}
            alt={user.full_name}
            className="w-14 h-14 rounded-full object-cover border border-gray-200"
          />
        </Link>

        {/* Info Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <Link
              to={`/profile/${user._id}`}
              className="text-sm font-semibold text-gray-900 truncate hover:underline"
            >
              {user.full_name}
            </Link>
            {user.is_verified && <Verified className="w-4 h-4 text-blue-500" />}
          </div>
          <p className="text-xs text-gray-500 truncate">@{user.username}</p>
          <p className="mt-1 text-xs text-gray-600 line-clamp-2">{user.bio}</p>
        </div>

        {/* Actions */}
        <div className="flex items-end gap-2">
          {/* Follow Button */}
          <button
            onClick={() => {
              currentUser.following.includes(user._id)
                ? setFollowModal(true)
                : handleFollow();
            }}
            className={`px-3 py-2 text-xs font-medium rounded-lg active:scale-95 transition
        ${
          currentUser?.following.includes(user._id)
            ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
          >
            {currentUser?.following.includes(user._id) ? (
              <div className="flex items-center gap-1">
                Following <ChevronDown className="h-2 w-2" />
              </div>
            ) : (
              "Follow"
            )}
          </button>

          {/* Connection / Message */}
          <button
            onClick={handleConnectionRequest}
            className={`px-3 py-2 text-xs font-medium rounded-lg active:scale-95 transition
        ${
          currentUser?.connections.includes(user._id)
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
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

      {followModal && (
        <div className="fixed inset-0 z-20 h-screen flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white w-[90%] max-w-sm rounded-xl shadow-lg p-6 text-center">
            <h2 className="text-lg font-semibold mb-3">
              Unfollow @{user?.username || "this user"}?
            </h2>

            <p className="text-gray-500 text-sm mb-6">
              You'll stop seeing their posts and updates
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleUnfollow}
                className="bg-red-500 text-white font-medium py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
              >
                Unfollow
              </button>

              <button
                onClick={() => setFollowModal(false)}
                className="bg-gray-100 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-200 transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
