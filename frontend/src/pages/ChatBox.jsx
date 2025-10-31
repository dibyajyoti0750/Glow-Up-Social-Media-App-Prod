import { useEffect, useRef, useState } from "react";
import { Camera, SendHorizonal, Verified, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import {
  addMessage,
  fetchMessages,
  fetchRecentMessages,
  resetMessages,
} from "../features/messages/messagesSlice";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function ChatBox() {
  const { messages } = useSelector((state) => state.messages);
  const { userId } = useParams();
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const messagesEndRef = useRef(null);

  const { connections } = useSelector((state) => state.connections);

  const fetchUserMessages = async () => {
    try {
      const token = await getToken();
      dispatch(fetchMessages({ token, userId }));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const sendMessage = async () => {
    try {
      if (!text && !image) return;

      const token = await getToken();
      const formData = new FormData();
      formData.append("to_user_id", userId);
      formData.append("text", text);
      image && formData.append("image", image);

      const { data } = await api.post("/api/message/send", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setText("");
        setImage(null);
        dispatch(addMessage(data.message));
        dispatch(fetchRecentMessages(token));
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchUserMessages();
    return () => dispatch(resetMessages());
  }, [userId]);

  useEffect(() => {
    if (connections.length > 0) {
      const user = connections.find((connection) => connection._id === userId);
      setUser(user);
    }
  }, [connections, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    user && (
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="flex items-center gap-2 py-3 px-6 bg-gray-50 border-b border-gray-300">
          <Link to={`/profile/${user._id}`}>
            <img
              src={user.profile_picture}
              alt="User profile picture"
              className="size-8 rounded-full object-cover"
            />
          </Link>
          <div>
            <div className="flex items-center gap-1">
              <Link
                to={`/profile/${user._id}`}
                className="font-medium hover:underline"
              >
                {user.full_name}
              </Link>
              {user.is_verified && (
                <Verified className="w-4 h-4 text-sky-600" />
              )}
            </div>
            <p className="text-xs text-gray-500">@{user.username}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="p-5 md:px-10 h-full overflow-y-scroll">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages
              .toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
              .map((message, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    message.to_user_id !== user._id
                      ? "items-start"
                      : "items-end"
                  }`}
                >
                  <div>
                    {message.message_type === "image" && (
                      <img
                        src={message.media_url}
                        alt="Sent image"
                        className="w-full max-w-sm rounded-2xl"
                      />
                    )}

                    {message.message_type !== "image" && message.text && (
                      <p
                        className={`p-3 text-sm max-w-sm rounded-2xl bg-gray-100/80 text-slate-700 whitespace-pre-line ${
                          message.to_user_id !== user._id
                            ? "rounded-bl-none"
                            : "rounded-br-none bg-indigo-600 text-white"
                        }`}
                      >
                        {message.text}
                      </p>
                    )}
                  </div>
                </div>
              ))}

            <div ref={messagesEndRef}></div>
          </div>
        </div>

        {/* Input area */}
        <div className="flex flex-col gap-3 w-full max-w-md md:max-w-3xl mx-auto bg-gray-100/80 rounded-3xl mb-5">
          {image && (
            <div className="relative group w-24 h-24 mx-3 mt-4">
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded preview"
                className="object-cover w-full h-full rounded-2xl transition duration-200"
              />
              <div
                onClick={() => setImage(null)}
                className="absolute hidden group-hover:flex justify-center items-center inset-0 bg-black/10 cursor-pointer rounded-xl"
              >
                <X className="text-white" />
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 p-2">
            <label htmlFor="image">
              <div className="w-9 h-9 flex items-center justify-center bg-indigo-600 rounded-full p-1.5">
                <Camera className="text-white cursor-pointer" />
                <input
                  id="image"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/*"
                  hidden
                />
              </div>
            </label>

            <input
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              placeholder="Message..."
              className="flex-1 outline-none text-slate-700"
            />

            <button
              title="send"
              disabled={!text && !image}
              onClick={sendMessage}
              className="mr-2 cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <SendHorizonal />
            </button>
          </div>
        </div>
      </div>
    )
  );
}
