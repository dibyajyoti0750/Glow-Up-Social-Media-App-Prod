import { Bookmark, Dot, Heart, MessageCircle, Send, X } from "lucide-react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

export default function PostModal({ post, setPostModal }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState(post.comments);
  const commentsEndRef = useRef(null);

  const { getToken } = useAuth();

  const addComment = async () => {
    try {
      const { data } = await api.post(
        "/api/comment/add",
        { text, postId: post._id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setText("");
        setComments((prev) => [...prev, data.comment]);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

  return (
    <div className="fixed inset-0 z-20 flex flex-col items-center justify-center bg-black/70 text-white backdrop-blur-sm">
      {/* Close button */}
      <div className="w-full max-w-4xl flex justify-between items-center py-2">
        <span></span>
        <button
          onClick={() => setPostModal(false)}
          className="p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
        >
          <X />
        </button>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-5 w-full max-w-4xl h-[90vh] bg-white text-black rounded overflow-hidden">
        {/* Left: Image section (fixed height) */}
        <div className="col-span-3 flex justify-center items-center bg-black overflow-hidden">
          {post.image_urls?.length > 0 && (
            <div className="w-full h-full flex">
              {post.image_urls.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`post image ${idx + 1}`}
                  className="object-contain w-full h-full"
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: Post details */}
        <div className="col-span-2 flex flex-col h-[90vh]">
          {/* Owner info */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 shrink-0">
            <img
              src={post.user.profile_picture}
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <div className="flex items-center font-semibold">
                <span>{post.user.username}</span>
                <Dot />
                <span className="text-sky-600">Follow</span>
              </div>
              <span className="text-xs text-gray-500">
                {moment(post.createdAt).fromNow()}
              </span>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {/* Caption */}
            {post.content && (
              <div className="flex items-center gap-3">
                <img
                  src={post.user.profile_picture}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <span className="font-semibold mr-2">
                    {post.user.username}
                  </span>
                  <span>{post.content}</span>
                </div>
              </div>
            )}

            {/* Comments */}
            {comments.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <img
                  src={item.user.profile_picture}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span className="font-semibold">{item.user.username}</span>
                    <span>{item.comment}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {moment(item.createdAt).fromNow()}
                  </span>
                </div>
              </div>
            ))}

            <div ref={commentsEndRef}></div>
          </div>

          {/* Like + action buttons */}
          <div className="flex flex-col gap-2 px-2 py-5 border-t border-gray-200 shrink-0">
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <Heart />
                <MessageCircle />
                <Send />
              </div>
              <Bookmark />
            </div>

            <div className="px-1.5 text-sm">
              {post.likes_count.length < 1
                ? "Be the first to like this"
                : post.likes_count.length}
            </div>
          </div>

          {/* Comment input */}
          <div className="p-3 flex items-center gap-3 border-t border-gray-200 shrink-0">
            <input
              onChange={(e) => setText(e.target.value)}
              value={text}
              type="text"
              placeholder="Add a comment..."
              className="flex-1 outline-none text-sm bg-transparent"
            />
            <button
              disabled={!text}
              onClick={addComment}
              className="text-sky-600 font-semibold hover:text-blue-600 disabled:text-gray-500 disabled:cursor-not-allowed cursor-pointer"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
