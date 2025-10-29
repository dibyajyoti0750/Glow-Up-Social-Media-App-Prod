import { useEffect, useState } from "react";
import { dummyRecentMessagesData } from "../assets/assets";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAuth, useUser } from "@clerk/clerk-react";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function RecentMessages() {
  const [messages, setMessages] = useState([]);
  const { user } = useUser();
  const { getToken } = useAuth();

  const fetchRecentMessages = async () => {
    try {
      const { data } = await api.get("/api/user/recent-messages", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        // group messages by sender & get the latest message for each sender
        const groupMessages = data.messages.reduce((acc, message) => {
          const senderId = message.from_user_id._id;

          if (
            !acc[senderId] ||
            new Date(message.createdAt) > new Date(acc[senderId].createdAt)
          ) {
            acc[senderId] = message;
          }

          return acc;
        }, {});

        // sort messages by date
        const sortedMessages = Object.values(groupMessages).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setMessages(sortedMessages);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRecentMessages();
      setInterval(fetchRecentMessages, 30000);
      return () => clearInterval();
    }
  }, [user]);

  return (
    <div className="bg-white max-w-xs mt-4 px-2 py-4 min-h-20 rounded shadow text-xs text-slate-800">
      <h3 className="font-semibold text-slate-800 mb-4 px-2">
        Recent Messages
      </h3>
      <div className="flex flex-col max-h-56 overflow-y-scroll no-scrollbar">
        {messages.map((message, idx) => (
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

              <div className="flex justify-between">
                <p className="text-gray-500">
                  {message.text ? message.text : "Media"}
                </p>
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
