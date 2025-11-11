import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Verified,
  Bookmark,
  Heart,
  MessageCircle,
  Send,
  Smile,
} from "lucide-react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axios";
import toast from "react-hot-toast";
import PostModal from "./PostModal";
import ShareModal from "./ShareModal";
import { fetchUser } from "../features/user/userSlice";

export default function PostCard({ post }) {
  const contentWithHashtags = post.content.replace(
    /(#\w+)/g,
    '<span class="text-indigo-500">$1</span>'
  );

  const [likes, setLikes] = useState(post.likes_count);
  const [postModal, setPostModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const currUser = useSelector((state) => state.user.value);
  const { connections } = useSelector((state) => state.connections);

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
          if (prev.includes(currUser._id)) {
            return prev.filter((id) => id !== currUser._id);
          } else {
            return [...prev, currUser._id];
          }
        });
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSavePost = async (id) => {
    try {
      const { data } = await api.post(
        "/api/user/save",
        { postId: id },
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

  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 my-6 space-y-4 w-full max-w-3xl">
      {/* User info */}
      <div
        onClick={() => navigate(`/profile/${post.user._id}`)}
        className="inline-flex items-center gap-2 cursor-pointer"
      >
        <img
          src={post.user.profile_picture}
          alt="profile picture"
          className="w-10 h-10 rounded-full object-cover shadow hover:opacity-90"
        />

        <div>
          <div className="flex items-center gap-1 text-sm">
            <span>{post.user.full_name}</span>
            {post.user.is_verified && (
              <Verified className="w-4 h-4 text-sky-600" />
            )}
          </div>

          <div className="text-gray-500 text-xs">
            @{post.user.username} • {moment(post.createdAt).fromNow()}
          </div>
        </div>
      </div>

      {/* Content */}
      {post.content && (
        <div
          className="text-gray-800 text-sm whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: contentWithHashtags }}
        ></div>
      )}

      {/* Images */}
      {post.image_urls.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {post.image_urls.map((img, idx) => (
            <img
              onClick={() => setPostModal(true)}
              loading="lazy"
              key={idx}
              src={img}
              title="View image"
              alt="post image"
              width={400}
              height={300}
              className={`w-full object-cover rounded cursor-pointer ${
                post.image_urls.length === 1
                  ? "col-span-2 h-auto max-h-[500px]"
                  : "h-48"
              }`}
            />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col text-gray-800 gap-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <Heart
              onClick={handleLike}
              className={`cursor-pointer ${
                likes.includes(currUser._id) ? "text-red-500 fill-red-500" : ""
              }`}
            />
            <MessageCircle
              onClick={() => setPostModal(true)}
              className="scale-x-[-1] cursor-pointer"
            />
            <Send
              onClick={() => setShareModal(true)}
              className="cursor-pointer"
            />
          </div>

          <Bookmark
            onClick={() => handleSavePost(post._id)}
            className={`cursor-pointer ${
              currUser.savedPosts.includes(post._id)
                ? "fill-sky-600 text-sky-600"
                : ""
            }`}
          />
        </div>

        <div className="flex flex-col gap-1 text-sm px-1">
          <div>
            {!likes.length ? (
              <>
                Be the first to <span className="font-semibold">like this</span>
              </>
            ) : likes.length === 1 ? (
              "1 like"
            ) : (
              `${likes.length} likes`
            )}
          </div>

          <div className="flex items-center justify-between text-gray-500 pb-4 border-b border-neutral-200">
            <span
              onClick={() => setPostModal(true)}
              className="hover:text-gray-700 italic cursor-pointer"
            >
              Add a comment...
            </span>

            <Smile
              onClick={() => setPostModal(true)}
              className="w-[15px] h-[15px] hover:text-gray-700 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {postModal && <PostModal post={post} setPostModal={setPostModal} />}

      {shareModal && (
        <ShareModal
          connections={connections}
          post={post}
          setShareModal={setShareModal}
        />
      )}
    </div>
  );
}
