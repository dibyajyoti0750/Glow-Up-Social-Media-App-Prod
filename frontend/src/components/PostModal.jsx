import { X } from "lucide-react";

export default function PostModal({ post, setPostModal }) {
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
      <div className="grid grid-cols-5 w-full max-w-4xl h-[90vh] bg-white text-black overflow-hidden rounded">
        {/* Left: Image section */}
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
        <div className="col-span-2 p-4 overflow-y-auto">
          Post details & Add comment feature
        </div>
      </div>
    </div>
  );
}
