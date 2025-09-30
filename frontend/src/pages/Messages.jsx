import { Link, useNavigate } from "react-router-dom";
import { dummyConnectionsData } from "../assets/assets";
import { BadgeCheck, Eye, MessageSquare, Search } from "lucide-react";

export default function Messages() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen relative bg-white">
      <div className="w-full max-w-3xl mx-auto my-8 px-8">
        {/* Search bar */}
        <div className="flex items-center px-4 py-2 gap-2 bg-slate-100 rounded-lg">
          <Search className="w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-900 my-8">Messages</h1>

        {/* Connected users */}
        <div className="flex flex-col gap-2">
          {dummyConnectionsData.map((user) => (
            <div
              onClick={() => navigate(`/inbox/${user._id}`)}
              key={user._id}
              className="flex gap-6 p-4 bg-white shadow rounded-lg cursor-pointer"
            >
              <Link
                to={`/profile/${user._id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={user.profile_picture}
                  alt="profile picture"
                  className="rounded-full size-12"
                />
              </Link>

              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <p className="font-medium text-slate-700">{user.full_name}</p>
                  {user.is_verified && (
                    <BadgeCheck className="w-4 h-4 text-sky-600" />
                  )}
                </div>
                <p className="text-sm text-slate-500">@{user.username}</p>
                <p className="text-sm text-gray-600">{user.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
