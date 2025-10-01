import { useState } from "react";
import { dummyUserData } from "../assets/assets";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Loading from "../components/Loading";

export default function Layout() {
  const userData = dummyUserData;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return userData ? (
    <div className="w-full flex h-screen">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1">
        <Outlet />
      </div>

      {sidebarOpen ? (
        <X
          onClick={() => setSidebarOpen(false)}
          className="absolute top-2 right-2 z-10 p-1 h-8 w-8 text-gray-700 sm:hidden cursor-pointer"
        />
      ) : (
        <Menu
          onClick={() => setSidebarOpen(true)}
          className="absolute top-2 right-2 z-10 p-1 h-8 w-8 text-gray-700 sm:hidden cursor-pointer"
        />
      )}
    </div>
  ) : (
    <Loading />
  );
}
