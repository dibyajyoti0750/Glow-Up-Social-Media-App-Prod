import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, UserButton } from "@clerk/clerk-react";
import MenuItems from "./MenuItems";
import { Ellipsis, LogOut, Settings } from "lucide-react";
import { useState } from "react";
import Popover from "@mui/material/Popover";
import CreatePostModal from "./CreatePostModal";
import { useSelector } from "react-redux";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const { openUserProfile, signOut } = useClerk();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div
        className={`w-60 xl:w-72 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute pt-5 top-0 bottom-0 z-10 ${
          sidebarOpen ? "translate-x-0" : "max-sm:-translate-x-full"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="w-full px-4">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 mb-5 mt-8 sm:mt-0 cursor-pointer"
          >
            <img src={assets.logo} alt="Logo" className="w-10" />
            <h3 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-red-400 to-red-700 bg-clip-text text-transparent">
              GlowUp
            </h3>
          </div>

          <MenuItems setSidebarOpen={setSidebarOpen} />

          <button
            onClick={() => setShowCreatePostModal(true)}
            className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 text-white font-bold text-lg rounded-full shadow-2xl hover:from-blue-600 hover:via-blue-700 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-70 active:bg-blue-800 active:shadow-inner transform transition duration-500 ease-in-out mx-auto my-4 cursor-pointer"
          >
            Post
          </button>
        </div>

        <div className="w-full p-4 px-7 flex items-center justify-between border-t border-gray-200">
          <div className="flex gap-2 items-center cursor-pointer">
            <UserButton />
            <div>
              <p className="text-sm font-medium">{user.full_name}</p>
              <p className="text-xs text-gray-500">@{user.username}</p>
            </div>
          </div>

          <Ellipsis
            onClick={handleClick}
            className="w-4 h-4 text-gray-400 hover:text-gray-800 transition cursor-pointer"
          />

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top", // anchor at the top of the ellipsis
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom", // popover grows downward from its bottom
              horizontal: "center",
            }}
          >
            <div className="flex flex-col space-y-3 p-4 font-medium text-gray-200">
              <div
                onClick={openUserProfile}
                className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 cursor-pointer"
              >
                <Settings className="w-4 h-4" /> Settings
              </div>

              <div
                onClick={signOut}
                className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 cursor-pointer"
              >
                <LogOut className="w-4 h-4" /> Sign out
              </div>
            </div>
          </Popover>
        </div>
      </div>

      {showCreatePostModal && (
        <CreatePostModal setShowModal={setShowCreatePostModal} />
      )}
    </>
  );
}
