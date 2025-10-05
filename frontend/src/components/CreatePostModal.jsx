import { useState } from "react";
import { dummyUserData } from "../assets/assets";
import { X, Image, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function CreatePostModal({ setShowModal }) {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = dummyUserData;

  const handleSubmit = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
        setShowModal(false);
      }, 5000);
    });
  };

  return (
    <div className="fixed inset-0 z-20 h-screen flex items-center justify-center bg-black/70 text-white backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden p-2 mx-auto animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Create Post</h2>
          <button
            title="close"
            onClick={() => setShowModal(false)}
            className="text-white py-2 cursor-pointer"
          >
            <X />
          </button>
        </div>

        {/* Body */}
        <div className="bg-white p-6 flex flex-col justify-between gap-6 rounded-lg h-96">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <img
              src={user.profile_picture}
              alt="profile picture"
              className="w-12 h-12 rounded-full object-cover shadow-md"
            />
            <div className="flex flex-col text-gray-800">
              <span className="font-medium">{user.full_name}</span>
              <span className="text-xs">@{user.username}</span>
            </div>
          </div>

          {/* Textarea */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full h-full border border-gray-200 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none placeholder-gray-400 text-gray-800 transition"
          />

          {/* Image Preview */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {images.map((image, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-xl overflow-hidden shadow-md"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt=""
                    className="h-24 w-24 object-cover rounded-xl transition-transform duration-200 group-hover:scale-105"
                  />
                  <div
                    onClick={() =>
                      setImages(images.filter((_, index) => index !== idx))
                    }
                    className="absolute hidden group-hover:flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-black/40 cursor-pointer rounded-xl"
                  >
                    <X />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="images"
              className="flex items-center gap-2 text-blue-500"
            >
              <Image className="text-blue-500 cursor-pointer hover:text-blue-600 transition" />
              {images.length > 0 && (
                <span>
                  {images.length > 1
                    ? `${images.length} images`
                    : `${images.length} image`}{" "}
                  selected
                </span>
              )}
            </label>

            <button
              onClick={() =>
                toast.promise(handleSubmit(), {
                  loading: "Uploading...",
                  success: () => <p>Post Added</p>,
                  error: (e) => <p>{e.message}</p>,
                })
              }
              disabled={loading || (!content && images.length === 0)}
              className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 disabled:bg-gray-300 transition focus:outline-none cursor-pointer"
            >
              <Send className="w-4 h-4" /> Post
            </button>
          </div>

          <input
            id="images"
            type="file"
            hidden
            accept="image/*"
            multiple
            onChange={(e) => setImages([...images, ...e.target.files])}
          />
        </div>
      </div>
    </div>
  );
}
