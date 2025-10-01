import { useState } from "react";
import { dummyConnectionsData } from "../assets/assets";
import { Loader, Search } from "lucide-react";
import UserCard from "../components/UserCard";

export default function Explore() {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState(dummyConnectionsData);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setUsers([]);
    setLoading(true);
    setTimeout(() => {
      setUsers(dummyConnectionsData);
      setLoading(false);
    }, 200);
  };

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
