import { useState } from "react";
import { dummyUserData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  Bookmark,
  Heart,
  MessageCircle,
  Send,
  Smile,
} from "lucide-react";
import moment from "moment";

export default function PostCard({ post }) {
  const contentWithHashtags = post.content.replace(
    /(#\w+)/g,
    '<span class="text-indigo-500">$1</span>'
  );

  const [likes, setLikes] = useState(post.likes_count);
  const currUser = dummyUserData;

  const handleLike = async () => {};

  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 my-6 space-y-4 w-full max-w-2xl">
      {/* User info */}
      <div
        onClick={() => navigate(`/profile/${post.user._id}`)}
        className="inline-flex items-center gap-2 cursor-pointer"
      >
        <img
          src={post.user.profile_picture}
          alt="profile picture"
          className="w-9 h-9 rounded-full shadow"
        />

        <div>
          <div className="flex items-center gap-1 text-sm">
            <span>{post.user.full_name}</span>
            {post.user.is_verified && (
              <BadgeCheck className="w-4 h-4 text-sky-600" />
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
      <div className="grid grid-cols-2 gap-2">
        {post.image_urls.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt="post image"
            className={`w-full h-48 object-cover rounded ${
              post.image_urls.length === 1 && "col-span-2 h-auto"
            }`}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col text-gray-800 gap-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <Heart
              onClick={handleLike}
              className={`w-5 h-5 cursor-pointer ${likes.includes(
                currUser._id && "text-red-500 fill-red-500"
              )}`}
            />
            <MessageCircle className="w-5 h-5 scale-x-[-1] cursor-pointer" />
            <Send className="w-5 h-5 cursor-pointer" />
          </div>

          <Bookmark className="w-5 h-5" />
        </div>

        <div className="flex flex-col gap-1 text-sm px-1">
          <div className="font-semibold">{likes.length} likes</div>
          <div className="text-gray-500 cursor-pointer">
            View all 40 comments
          </div>
          <div className="flex items-center justify-between text-gray-500 cursor-pointer">
            Add a comment... <Smile className="w-[15px] h-[15px]" />
          </div>
        </div>
      </div>

      <hr className="border-neutral-200" />
    </div>
  );
}
