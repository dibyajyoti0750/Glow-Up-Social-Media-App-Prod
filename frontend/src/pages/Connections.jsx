import { useEffect, useState } from "react";
import {
  UsersRound,
  UserRoundPlus,
  UserRoundCheck,
  UserRoundPen,
  MessageCircleHeart,
  Verified,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/axios";
import toast from "react-hot-toast";
import { fetchConnections } from "../features/connections/connectionsSlice";

export default function Connections() {
  const [currentTab, setCurrentTab] = useState("Followers");

  const navigate = useNavigate();

  const { getToken } = useAuth();
  const dispatch = useDispatch();

  const { connections, pendingConnections, followers, following } = useSelector(
    (state) => state.connections
  );

  const dataArray = [
    { label: "Followers", value: followers, Icon: UsersRound },
    { label: "Following", value: following, Icon: UserRoundCheck },
    { label: "Pending", value: pendingConnections, Icon: UserRoundPen },
    { label: "Connections", value: connections, Icon: UserRoundPlus },
  ];

  const handleUnfollow = async (userId) => {
    try {
      const { data } = await api.post(
        "/api/user/unfollow",
        { id: userId },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        toast.success(data.message);
        dispatch(fetchConnections(await getToken()));
      } else {
        toast(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const acceptConnections = async (userId) => {
    try {
      const { data } = await api.post(
        "/api/user/accept",
        { id: userId },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        toast.success(data.message);
        dispatch(fetchConnections(await getToken()));
      } else {
        toast(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getToken().then((token) => {
      dispatch(fetchConnections(token));
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-7xl mx-auto my-8 px-8">
        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-900 my-6">Connections</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
          {/* Left column - Counts */}
          <div className="col-span-1 mb-6">
            <div className="p-6 border border-gray-100 shadow-sm rounded-lg h-fit">
              <h2 className="mb-4 font-medium">Network overview</h2>
              <div className="grid grid-cols-2 gap-6">
                {dataArray.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-start justify-center gap-1"
                  >
                    <p className="font-medium text-xl">{item.value.length}</p>
                    <p className="text-slate-600">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Tabs + Users */}
          <div className="col-span-2">
            {/* Tabs */}
            <div className="flex justify-around md:justify-between items-center border border-gray-100 rounded-lg p-1 shadow-sm mb-6">
              {dataArray.map((tab) => (
                <button
                  onClick={() => setCurrentTab(tab.label)}
                  key={tab.label}
                  className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer ${
                    currentTab === tab.label
                      ? "bg-gray-100 font-medium text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  <tab.Icon className="w-4 h-4" />
                  <span className="ms-1">{tab.label}</span>
                  {tab.value.length > 0 && (
                    <span className="ms-2 text-xs bg-gray-50 text-gray-700 px-2 py-0.5 rounded-full">
                      {tab.value.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Users */}
            <div className="flex flex-wrap gap-4 mt-6 font-medium">
              {dataArray
                .find((item) => item.label === currentTab)
                .value.map((user) => (
                  <div
                    key={user._id}
                    className="w-full flex gap-4 p-4 bg-white shadow rounded-lg"
                  >
                    <img
                      src={user.profile_picture}
                      alt="profile picture"
                      className="rounded-full w-12 h-12 shadow-sm object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <p className="text-slate-700">{user.full_name}</p>
                        {user.is_verified && (
                          <Verified className="w-4 h-4 text-sky-600" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500">@{user.username}</p>
                      <p className="text-sm text-slate-600">
                        {user.bio.slice(0, 30)}...
                      </p>

                      <div className="flex max-sm:flex-col gap-2 mt-4">
                        <button
                          onClick={() => navigate(`/profile/${user._id}`)}
                          className="w-full px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 active:scale-95 cursor-pointer transition"
                        >
                          View Profile
                        </button>

                        {currentTab === "Followers" &&
                          // Check if in my following list, there is any user with the same id as this current follower.
                          !following.some((f) => f._id === user._id) && (
                            <button className="w-full px-3 py-2 bg-gray-100 text-black text-sm rounded-lg hover:bg-gray-200 active:scale-95 cursor-pointer transition">
                              Follow Back
                            </button>
                          )}

                        {currentTab === "Following" && (
                          <button
                            onClick={() => handleUnfollow(user._id)}
                            className="w-full px-3 py-2 bg-gray-100 text-black text-sm rounded-lg hover:bg-gray-200 active:scale-95 cursor-pointer transition"
                          >
                            Unfollow
                          </button>
                        )}

                        {currentTab === "Pending" && (
                          <button
                            onClick={() => acceptConnections(user._id)}
                            className="w-full px-3 py-2 bg-gray-100 text-black text-sm rounded-lg hover:bg-gray-200 active:scale-95 cursor-pointer transition"
                          >
                            Accept
                          </button>
                        )}

                        {currentTab === "Connections" && (
                          <button
                            onClick={() => navigate(`/inbox/${user._id}`)}
                            className="w-full px-3 py-2 bg-gray-100 text-black text-sm rounded-lg hover:bg-gray-200 active:scale-95 cursor-pointer transition flex items-center justify-center gap-1"
                          >
                            <MessageCircleHeart className="w-4 h-4" />
                            Message
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
