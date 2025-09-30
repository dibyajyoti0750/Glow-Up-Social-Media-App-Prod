import { useState } from "react";
import {
  dummyConnectionsData as connections,
  dummyFollowersData as followers,
  dummyFollowingData as following,
  dummyPendingConnectionsData as pendingConnections,
} from "../assets/assets";
import {
  UsersRound,
  UserRoundPlus,
  UserRoundCheck,
  UserRoundPen,
  MessageCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Connections() {
  const [currentTab, setCurrentTab] = useState("Followers");

  const navigate = useNavigate();

  const dataArray = [
    { label: "Followers", value: followers, Icon: UsersRound },
    { label: "Following", value: following, Icon: UserRoundCheck },
    { label: "Pending", value: pendingConnections, Icon: UserRoundPen },
    { label: "Connections", value: connections, Icon: UserRoundPlus },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-7xl mx-auto my-8 px-8">
        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-900 my-6">Connections</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - Counts */}
          <div className="col-span-1">
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
            <div className="flex flex-wrap justify-between items-center border border-gray-100 rounded-lg p-1 shadow-sm mb-6">
              {dataArray.map((tab) => (
                <button
                  onClick={() => setCurrentTab(tab.label)}
                  key={tab.label}
                  className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer ${
                    currentTab === tab.label
                      ? "bg-gray-100 font-medium text-black"
                      : "text-gray-500 hover:text-black hover:bg-gray-100"
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

            {/* < ----- Todo ----- > */}
            {/* Users */}
            <div className="flex flex-wrap gap-6 mt-6">
              {dataArray
                .find((item) => item.label === currentTab)
                .value.map((user) => (
                  <div
                    key={user._id}
                    className="w-full max-w-[22rem] flex gap-5 p-6 bg-white shadow rounded-lg"
                  >
                    <img
                      src={user.profile_picture}
                      alt="profile picture"
                      className="rounded-full w-12 h-12 shadow-sm mx-auto"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-slate-700">
                        {user.full_name}
                      </p>
                      <p className="text-slate-500">@{user.username}</p>
                      <p className="text-sm text-gray-600">
                        {user.bio.slice(0, 30)}...
                      </p>

                      <div className="flex max-sm:flex-col gap-2 mt-4">
                        <button
                          onClick={() => navigate(`/profile/${user._id}`)}
                          className="w-full p-2 text-sm rounded bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition text-white cursor-pointer"
                        >
                          View Profile
                        </button>

                        {currentTab === "Following" && (
                          <button className="w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-black active:scale-95 transition cursor-pointer">
                            Unfollow
                          </button>
                        )}

                        {currentTab === "Pending" && (
                          <button className="w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-black active:scale-95 transition cursor-pointer">
                            Accept
                          </button>
                        )}

                        {currentTab === "Connections" && (
                          <button
                            onClick={() => navigate(`/inbox/${user._id}`)}
                            className="w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-black active:scale-95 transition cursor-pointer flex items-center justify-center gap-1"
                          >
                            <MessageCircle className="w-4 h-4" />
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
