import { useEffect, useState } from "react";
import { dummyConnectionsData } from "../assets/assets";
import { Loader, Search } from "lucide-react";
import UserCard from "../components/UserCard";
import { useDispatch } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { fetchUser } from "../features/user/userSlice";

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
      <div className="w-full max-w-5xl mx-auto my-8 px-8">
        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-900 my-6">Explore</h1>

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

        <div className="flex justify-around mt-6 flex-wrap gap-8">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
