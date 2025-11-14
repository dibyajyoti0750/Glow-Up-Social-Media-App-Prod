import { useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentMessages } from "../features/messages/messagesSlice";
import { Image } from "lucide-react";

export default function RecentMessages() {
  const dispatch = useDispatch();
  const { recentMessages } = useSelector((state) => state.messages);
  const { user } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    if (!user) return;
    getToken().then((token) => {
      dispatch(fetchRecentMessages(token));
    });
  }, [user, getToken, dispatch]);

  return (
    <div className="bg-white max-w-xs mt-4 px-2 py-4 min-h-20 rounded shadow text-xs text-slate-800">
      <h3 className="font-semibold text-slate-800 mb-4 px-2">
        Recent Messages
      </h3>
      <div className="flex flex-col max-h-56 overflow-y-scroll no-scrollbar">
        {recentMessages.map((message, idx) => (
          <Link
            to={`/inbox/${message.from_user_id._id}`}
            key={idx}
            className="flex items-center gap-2 p-2 rounded hover:bg-neutral-100"
          >
            <img
              src={message.from_user_id.profile_picture}
              alt="sent by"
              className="w-8 h-8 rounded-full object-cover"
            />

            <div className="w-full">
              <div className="flex justify-between">
                <p className="font-medium">{message.from_user_id.full_name}</p>
                <p className="text-[10px] text-slate-400">
                  {moment(message.createdAt).fromNow()}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-gray-500">
                  {message.text ? (
                    message.text
                  ) : (
                    <div className="flex items-center gap-1">
                      <Image className="h-3 w-3" /> Media
                    </div>
                  )}
                </div>
                {!message.seen && (
                  <p className="bg-blue-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]">
                    1
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
