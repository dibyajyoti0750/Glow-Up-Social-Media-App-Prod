import { useState } from "react";
import { Image, SquarePlay, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import CreatePostModal from "./CreatePostModal.jsx";

export default function CreatePost({ profile_picture }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 bg-white border border-gray-50 shadow px-5 py-4 rounded-lg">
      {/* Top row: avatar + input */}
      <div className="flex items-center gap-3">
        <Link to={"/profile"}>
          <img
            src={
              profile_picture || "https://www.gravatar.com/avatar/?d=mp&s=80"
            }
            alt="profile picture"
            className="w-10 h-10 rounded-full object-cover hover:opacity-90"
          />
        </Link>

        <div
          onClick={() => setShowModal(true)}
          className="flex-1 text-left bg-gray-50 hover:bg-gray-100 transition rounded-full p-3 text-sm text-slate-400 cursor-pointer"
        >
          What's happening?
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-3" />

      {/* Actions row */}
      <div className="flex items-center justify-between">
        <div
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image className="w-5 h-5 text-blue-500" />
          <SquarePlay className="w-5 h-5 text-blue-500" />
          <Heart className="w-5 h-5 text-blue-500" />
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center px-6 py-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 text-white font-bold text-lg rounded-full shadow-2xl hover:from-blue-600 hover:via-blue-700 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-70 active:bg-blue-800 active:shadow-inner transform transition duration-500 ease-in-out cursor-pointer"
        >
          Post
        </button>
      </div>

      {showModal && <CreatePostModal setShowModal={setShowModal} />}
    </div>
  );
}
