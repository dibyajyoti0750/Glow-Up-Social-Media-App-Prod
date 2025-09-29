import { useEffect, useState } from "react";
import { dummyRecentMessagesData } from "../assets/assets";
import { Link } from "react-router-dom";
import moment from "moment";

export default function RecentMessages() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    setMessages(dummyRecentMessagesData);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

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
              className="w-8 h-8 rounded-full"
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
