import { useState } from "react";
import { SquarePlay, Heart, ImagePlus } from "lucide-react";
import { Link } from "react-router-dom";
import CreatePostModal from "./CreatePostModal.jsx";

export default function CreatePost({ profile_picture }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl mx-2 bg-white border border-gray-100 shadow-sm p-5 rounded-xl">
        {/* Top row */}
        <div className="flex items-center gap-4">
          <Link to="/profile">
            <img
              src={
                profile_picture || "https://www.gravatar.com/avatar/?d=mp&s=80"
              }
              alt="profile picture"
              className="w-11 h-11 rounded-full object-cover"
            />
          </Link>

          <div
            onClick={() => setShowModal(true)}
            className="flex-1 bg-gray-50 hover:bg-gray-100 transition-colors rounded-full px-4 py-3 text-sm text-gray-500 cursor-pointer"
          >
            What's happening?
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4" />

        {/* Action row */}
        <div className="flex items-center justify-between">
          <div
            onClick={() => setShowModal(true)}
            className="flex items-center gap-4 cursor-pointer"
          >
            <ImagePlus className="w-5 h-5 text-sky-600" />
            <SquarePlay className="w-5 h-5 text-sky-600" />
            <Heart className="w-5 h-5 text-sky-600" />
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
    </div>
  );
}
