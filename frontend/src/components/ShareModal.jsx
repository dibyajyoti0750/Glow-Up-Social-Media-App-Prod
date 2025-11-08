import { X } from "lucide-react";
import api from "../api/axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

export default function ShareModal({ connections, post, setShareModal }) {
  const { getToken } = useAuth();

  const handleShare = async (to) => {
    try {
      const { data } = await api.post(
        "/api/message/share",
        { to_user_id: to, postId: post._id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        toast.success("You shared this post");
        setShareModal(false);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-20 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
      {/* Modal box */}
      <div className="bg-white rounded-lg shadow-lg w-80 p-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Share</h2>
          <X
            onClick={() => setShareModal(false)}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          />
        </div>

        {/* Body */}
        <div className="flex items-center gap-4">
          {connections.map((conn, i) => (
            <div
              onClick={() => handleShare(conn._id)}
              className="flex flex-col gap-1 items-center"
            >
              <img
                title={conn.full_name}
                key={i}
                src={conn.profile_picture}
                alt={i}
                className="h-16 w-16 rounded-full hover:opacity-85 cursor-pointer"
              />
              <p className="text-sm">{conn.username.slice(0, 5)}...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
