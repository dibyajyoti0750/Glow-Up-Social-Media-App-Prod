import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Notification({ t, message }) {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-md flex items-center justify-between bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-3 p-4 flex-1">
        <img
          src={message.from_user_id.profile_picture}
          alt="profile picture"
          className="w-11 h-11 rounded-full object-cover shrink-0 ring-1 ring-gray-200"
        />
        <div className="flex-1">
          <p className="text-[15px] font-semibold text-gray-900 leading-tight">
            {message.from_user_id.full_name}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {message.text.slice(0, 50)}
          </p>
        </div>
      </div>

      <button
        onClick={() => {
          navigate(`/inbox/${message.from_user_id._id}`);
          toast.remove(t.id);
        }}
        className="px-4 py-2 text-indigo-600 font-medium hover:text-indigo-700 transition-colors duration-200 cursor-pointer"
      >
        Reply
      </button>
    </div>
  );
}
