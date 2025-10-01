import { Link, useNavigate } from "react-router-dom";
import { dummyConnectionsData } from "../assets/assets";
import { BadgeCheck, Loader, Search } from "lucide-react";
import { useState } from "react";

export default function Messages() {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState(dummyConnectionsData);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setUsers([]);
    setLoading(true);
    setTimeout(() => {
      setUsers(dummyConnectionsData);
      setLoading(false);
    }, 200);
  };

  const navigate = useNavigate();
  return (
    <div className="min-h-screen relative bg-white">
      <div className="w-full max-w-4xl mx-auto my-8 px-8">
        {/* Search bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 rounded-lg">
          <div className="flex items-center w-full gap-2">
            <Search className="w-5 h-5 text-slate-500" />
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyUp={handleSearch}
              type="text"
              placeholder="Search"
              className="w-full bg-transparent placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          {loading && <Loader className="text-gray-500 animate-spin" />}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-900 my-6">Messages</h1>

        {/* Connected users */}

        <div className="flex flex-col gap-2">
          {users.map((user) => (
            <div
              onClick={() => navigate(`/inbox/${user._id}`)}
              key={user._id}
              className="flex gap-6 p-4 bg-white shadow border border-gray-100 rounded-lg cursor-pointer"
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

              <div className="flex-1 font-medium">
                <div className="flex items-center gap-1">
                  <p className="text-slate-700">{user.full_name}</p>
                  {user.is_verified && (
                    <BadgeCheck className="w-4 h-4 text-sky-600" />
                  )}
                </div>
                <p className="text-xs text-slate-500">@{user.username}</p>
                <p className="text-sm text-gray-600">{user.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
