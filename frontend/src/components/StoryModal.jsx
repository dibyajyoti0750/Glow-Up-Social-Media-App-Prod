import { Check, Pencil, Sparkle, Upload, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function StoryModal({ setShowModal, fetchStories }) {
  const bgColors = [
    "#e63946",
    "#000000",
    "#075e54",
    "#128c7e",
    "#25d366",
    "#dcf8c6",
    "#a8dadc",
    "#457b9d",
    "#1d3557",
    "#10002b",
    "#240046",
    "#3c096c",
    "#5a189a",
    "#7b2cbf",
    "#9d4edd",
    "#c77dff",
    "#e0aaff",
    "#012a4a",
    "#013a63",
    "#01497c",
    "#014f86",
    "#2a6f97",
    "#2c7da0",
    "#468faf",
    "#61a5c2",
    "#89c2d9",
    "#a9d6e5",
    "#f1faee",
  ];

  const [mode, setMode] = useState("text");
  const [background, setBackground] = useState(bgColors[0]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setMedia(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAddStory = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
        setShowModal(false);
      }, 5000);
    });
  };

  return (
    <div className="fixed inset-0 z-20 min-h-screen bg-black/70 backdrop-blur-sm text-white flex items-center justify-center p-4">
      <div className="w-full max-w-xl overflow-hidden animate-fade-in">
        <div className="text-center mb-4 flex items-center justify-between">
          <h2 className="text-xl font-medium">Add Story</h2>

          <button
            title="close"
            onClick={() => setShowModal(false)}
            className="text-white py-2 cursor-pointer"
          >
            <X />
          </button>
        </div>

        <div
          style={{ backgroundColor: background }}
          className="rounded-lg h-96 flex items-center justify-center"
        >
          {mode === "text" && (
            <textarea
              onChange={(e) => setText(e.target.value)}
              value={text}
              className="bg-transparent text-white w-full h-[30%] text-center p-6 text-3xl resize-none focus:outline-none no-scrollbar"
              placeholder="What's on your mind?"
            />
          )}

          {mode === "media" &&
            previewUrl &&
            (media.type.startsWith("image/") ? (
              <img
                src={previewUrl}
                alt="story image"
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
              <video
                src={previewUrl}
                className="object-cover h-full rounded-lg"
              />
            ))}
        </div>

        <div className="flex mt-4 gap-4 overflow-x-scroll max-w-full no-scrollbar">
          {bgColors.map((color) => (
            <div
              title={color}
              key={color}
              onClick={() => setBackground(color)}
              className="flex justify-center items-center w-10 h-10 rounded-full cursor-pointer flex-shrink-0"
              style={{ backgroundColor: color }}
            >
              {background === color && <Check size={24} />}
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-4 font-medium">
          <button
            onClick={() => {
              setMode("text");
              setMedia(null);
              setPreviewUrl(null);
            }}
            className={`flex flex-1 items-center justify-center gap-2 p-3 rounded-lg cursor-pointer ${
              mode === "text"
                ? "bg-white text-black"
                : "bg-neutral-800 text-neutral-400"
            }`}
          >
            <Pencil size={18} /> Text
          </button>

          <label
            className={`flex flex-1 items-center justify-center gap-2 p-3 rounded-lg cursor-pointer ${
              mode === "media"
                ? "bg-white text-black"
                : "bg-neutral-800 text-neutral-400"
            }`}
          >
            <input
              type="file"
              onChange={(e) => {
                handleMediaUpload(e);
                setMode("media");
              }}
              accept="image/*,video/*"
              className="hidden"
            />
            <Upload size={18} /> Photo/Video
          </label>
        </div>

        <button
          onClick={() =>
            toast.promise(handleAddStory(), {
              loading: "Saving...",
              success: () => <p>Story added</p>,
              error: (e) => <p>{e.message}</p>,
            })
          }
          className="flex items-center justify-center gap-2 py-3 mt-4 w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 text-white font-semibold text-lg rounded-full shadow-2xl hover:from-blue-600 hover:via-blue-700 hover:to-blue-600 active:scale-95 transform duration-200 ease-in-out transition cursor-pointer"
        >
          <Sparkle size={18} /> Add story
        </button>
      </div>
    </div>
  );
}
