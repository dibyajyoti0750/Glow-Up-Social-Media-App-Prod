import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Verified, ChevronLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import api from "../api/axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";

export default function Messages() {
  const { connections } = useSelector((state) => state.connections);
  const [latestMessages, setLatestMessages] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 786);

  const navigate = useNavigate();
  const location = useLocation();
  const { getToken } = useAuth();
  const { user: currUser } = useUser();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const inChat = location.pathname.startsWith("/inbox/");
  const handleLeftPanel = inChat && isMobile;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/message/latest", {
          headers: { Authorization: `Bearer ${await getToken()}` },
        });
        data.success
          ? setLatestMessages(data.latestMessages)
          : toast.error(data.message);
      } catch (err) {
        toast.error(err.message);
      }
    })();
  }, []);

  return (
    <div className="h-screen bg-white flex">
      {!handleLeftPanel && (
        <div className="w-full md:w-1/5 border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-6">
              <span
                onClick={() => navigate(-1)}
                title="Go back"
                className="cursor-pointer"
              >
                <ChevronLeft className="w-7 h-7" />
              </span>
              Messages
            </div>

            <div className="py-2 px-4 w-fit rounded-full bg-blue-50 text-blue-800 font-medium mb-4">
              My connections
            </div>

            <div className="flex flex-col gap-3">
              {connections.map((user) => (
                <div
                  onClick={() => navigate(`/inbox/${user._id}`)}
                  key={user._id}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition"
                >
                  <Link
                    to={`/profile/${user._id}`}
                    onClick={(e) => e.stopPropagation()}
                    title="View profile"
                  >
                    <img
                      src={user.profile_picture}
                      alt="profile"
                      className="rounded-full size-12 object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="text-slate-700 font-medium truncate">
                        {user.full_name}
                      </p>
                      {user.is_verified && (
                        <Verified className="w-4 h-4 text-sky-600 shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      {/* Display the last message */}
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {(() => {
                          const latest = latestMessages.find(
                            (msg) =>
                              msg.from_user_id === user._id ||
                              msg.to_user_id === user._id
                          );

                          if (!latest) return "";

                          const isCurrentUserSender =
                            latest.from_user_id === currUser.id;

                          return isCurrentUserSender
                            ? `You: ${latest.text}`
                            : latest.text;
                        })()}
                      </p>

                      {/* Display unseen badge */}
                      {(() => {
                        const latest = latestMessages.find(
                          (msg) =>
                            msg.from_user_id === user._id ||
                            msg.to_user_id === user._id
                        );

                        const isUnread =
                          latest &&
                          latest.from_user_id === user._id &&
                          !latest.seen;

                        return (
                          isUnread && (
                            <p className="bg-blue-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]">
                              1
                            </p>
                          )
                        );
                      })()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 h-full overflow-hidden">
        {inChat ? (
          <Outlet />
        ) : (
          <div className="flex flex-col gap-5 justify-center items-center h-full opacity-80">
            <div className="w-55 h-55 flex justify-center items-center border-2 rounded-full">
              <img src={assets.send} alt="Send" className="h-28 w-28" />
            </div>
            <p className="text-lg font-semibold">
              Select a conversation to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
