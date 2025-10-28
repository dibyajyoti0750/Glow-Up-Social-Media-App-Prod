import { Link, useNavigate } from "react-router-dom";
import { Verified, Loader, Search } from "lucide-react";
import { useSelector } from "react-redux";

export default function Messages() {
  const { connections } = useSelector((state) => state.connections);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative bg-white">
      <div className="w-full max-w-4xl mx-auto my-8 px-8">
        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-900 my-6">Messages</h1>

        {/* Connected users */}
        <div className="flex flex-col gap-2">
          {connections.map((user) => (
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
                  className="rounded-full size-12 object-cover"
                />
              </Link>

              <div className="flex-1 font-medium">
                <div className="flex items-center gap-1">
                  <p className="text-slate-700">{user.full_name}</p>
                  {user.is_verified && (
                    <Verified className="w-4 h-4 text-sky-600" />
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
