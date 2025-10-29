import { useEffect, useState } from "react";
import { Loader, Search } from "lucide-react";
import UserCard from "../components/UserCard";
import { useDispatch } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { fetchUser } from "../features/user/userSlice";
import { assets } from "../assets/assets";

export default function Explore() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      try {
        setUsers([]);
        setLoading(true);
        const { data } = await api.post(
          "/api/user/discover",
          { input },
          { headers: { Authorization: `Bearer ${await getToken()}` } }
        );

        data.success ? setUsers(data.users) : toast.error(data.message);
        setInput("");
      } catch (err) {
        toast.error(err.message);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    getToken().then((token) => {
      dispatch(fetchUser(token));
    });
  }, [dispatch, getToken]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto flex gap-8 px-8 py-8">
        {/* Left / Main Section */}
        <div className="flex-1">
          {/* Title */}
          <h1 className="text-2xl font-bold text-slate-900 my-6">Explore</h1>

          {/* Search Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-100 rounded-lg">
            <div className="flex items-center w-full gap-2">
              <Search className="w-5 h-5 text-slate-500" />
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                onKeyUp={handleSearch}
                type="text"
                placeholder="Search"
                className="w-full bg-transparent placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            {loading && <Loader className="text-gray-500 animate-spin" />}
          </div>

          {/* User Cards */}
          <div className="flex justify-around mt-6 flex-wrap gap-8">
            {users.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        </div>

        {/* Right Sponsored Section */}
        <div className="hidden xl:block w-80 flex-shrink-0">
          <div className="sticky top-8 bg-white text-xs p-4 rounded-xl shadow-sm flex flex-col gap-2">
            <h3 className="text-slate-900 font-semibold text-sm mb-2">
              Sponsored
            </h3>
            <img
              loading="lazy"
              src={assets.sponsored_img}
              alt="sponsored image"
              className="w-full h-full rounded"
            />
            <p className="text-slate-700 font-medium mt-2">Power Redefined</p>
            <p className="text-slate-500">
              Experience the future with myPhone69 Pro Max
            </p>
            <button className="p-2 rounded font-semibold text-sm text-white bg-blue-500 hover:bg-blue-600 cursor-pointer">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
