import { Bookmark, Dot, Heart, MessageCircle, Send, X } from "lucide-react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../features/user/userSlice";

export default function PostModal({ post, setPostModal }) {
  const currentUser = useSelector((state) => state.user.value);
  const [text, setText] = useState("");
  const [likes, setLikes] = useState(post.likes_count);
  const [comments, setComments] = useState(post.comments);
  const [followModal, setFollowModal] = useState(false);
  const commentsEndRef = useRef(null);
  const inputRef = useRef(null);

  const { getToken } = useAuth();
  const dispatch = useDispatch();

  const handleLike = async () => {
    try {
      const { data } = await api.post(
        "/api/post/like",
        { postId: post._id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setLikes((prev) => {
          if (prev.includes(currentUser._id)) {
            return prev.filter((id) => id !== currentUser._id);
          } else {
            return [...prev, currentUser._id];
          }
        });
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleFollow = async () => {
    try {
      const { data } = await api.post(
        "/api/user/follow",
        { id: post.user._id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        toast.success(data.message);
        dispatch(fetchUser(await getToken()));
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUnfollow = async () => {
    try {
      const { data } = await api.post(
        "/api/user/unfollow",
        { id: post.user._id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setFollowModal(false);
        dispatch(fetchUser(await getToken()));
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

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

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [comments]);

  // I'm sorry for writing so many lines, but most of the code is just repeated & slightly changed for a separate layout
  return (
    <>
      {post.image_urls.length > 0 ? (
        // 🖼️ Image post layout
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
                  <div className="flex items-center font-semibold text-sm">
                    <span>{post.user.username}</span>

                    {currentUser._id !== post.user._id && (
                      <>
                        <Dot />
                        <span className="text-sky-600 hover:text-sky-700 cursor-pointer">
                          {currentUser.following.includes(post.user._id) ? (
                            <span
                              onClick={() => setFollowModal(true)}
                              className="text-gray-500"
                            >
                              Following
                            </span>
                          ) : (
                            <span onClick={handleFollow}>Follow</span>
                          )}
                        </span>
                      </>
                    )}
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
                      <p className="text-sm">
                        <span className="font-semibold mr-2">
                          {item.user.username}
                        </span>
                        <span className="break-words">{item.comment}</span>
                      </p>
                      <span className="text-xs text-gray-500 mt-1">
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
                    <Heart
                      onClick={handleLike}
                      className={`cursor-pointer ${
                        likes.includes(currentUser._id)
                          ? "text-red-500 fill-red-500"
                          : ""
                      }`}
                    />
                    <MessageCircle
                      onClick={() => inputRef.current.focus()}
                      className="cursor-pointer"
                    />
                    <Send />
                  </div>
                  <Bookmark />
                </div>

                <div className="px-1.5 text-sm">
                  {likes.length < 1
                    ? "Be the first to like this"
                    : likes.length === 1
                    ? "1 like"
                    : `${likes.length} likes`}
                </div>
              </div>

              {/* Comment input */}
              <div className="p-3 flex items-center gap-3 border-t border-gray-200 shrink-0">
                <input
                  ref={inputRef}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addComment()}
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
      ) : (
        // ✍️ Text-only Post Layout
        <div className="fixed inset-0 z-20 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
          {/* Close button */}
          <div className="w-full max-w-xl flex justify-between items-center py-2">
            <span></span>
            <button
              onClick={() => setPostModal(false)}
              className="p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
            >
              <X className="text-white" />
            </button>
          </div>

          <div className="w-full max-w-xl h-[50vh] bg-white text-black rounded-lg overflow-hidden shadow-lg flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 shrink-0">
              <img
                src={post.user.profile_picture}
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <div className="flex items-center font-semibold text-sm">
                  <span>{post.user.username}</span>
                  {currentUser._id !== post.user._id && (
                    <>
                      <Dot />
                      <span className="text-sky-600 hover:text-sky-700 cursor-pointer">
                        {currentUser.following.includes(post.user._id) ? (
                          <span
                            onClick={() => setFollowModal(true)}
                            className="text-gray-500"
                          >
                            Following
                          </span>
                        ) : (
                          <span onClick={handleFollow}>Follow</span>
                        )}
                      </span>
                    </>
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {moment(post.createdAt).fromNow()}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 text-gray-900 text-base leading-relaxed break-words">
                {post.content}
              </div>

              {/* Likes */}
              <div className="px-4 py-2 flex items-center justify-between">
                <div className="flex gap-4">
                  <Heart
                    onClick={handleLike}
                    className={`cursor-pointer ${
                      likes.includes(currentUser._id)
                        ? "text-red-500 fill-red-500"
                        : ""
                    }`}
                  />
                  <MessageCircle
                    onClick={() => inputRef.current.focus()}
                    className="cursor-pointer"
                  />
                  <Send />
                </div>
                <Bookmark />
              </div>

              <div className="px-4 text-sm text-gray-600 pb-2">
                {likes.length < 1
                  ? "Be the first to like this"
                  : likes.length === 1
                  ? "1 like"
                  : `${likes.length} likes`}
              </div>

              {/* Comments */}
              <div className="p-4 max-h-60 overflow-y-auto border-t border-gray-200">
                {comments.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 mb-2">
                    <img
                      src={item.user.profile_picture}
                      alt="User"
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex flex-col">
                      <p className="text-sm">
                        <span className="font-semibold mr-2">
                          {item.user.username}
                        </span>
                        <span className="break-words">{item.comment}</span>
                      </p>
                      <span className="text-xs text-gray-500 mt-1">
                        {moment(item.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comment input */}
            <div className="p-3 flex items-center gap-3 border border-gray-200">
              <input
                ref={inputRef}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addComment()}
                value={text}
                type="text"
                placeholder="Add a comment..."
                className="flex-1 outline-none text-sm bg-transparent"
              />
              <button
                disabled={!text}
                onClick={addComment}
                className="text-sky-600 font-semibold hover:text-blue-600 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {followModal && (
        <div className="fixed inset-0 z-20 h-screen flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white w-[90%] max-w-sm rounded-xl shadow-lg p-6 text-center">
            <h2 className="text-lg font-semibold mb-3">
              Unfollow @{post.user.username || "this user"}?
            </h2>

            <p className="text-gray-500 text-sm mb-6">
              You'll stop seeing their posts and updates
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleUnfollow}
                className="bg-red-500 text-white font-medium py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
              >
                Unfollow
              </button>

              <button
                onClick={() => setFollowModal(false)}
                className="bg-gray-100 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-200 transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
