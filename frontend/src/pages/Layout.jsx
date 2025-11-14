import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

export default function Layout() {
  const userData = useSelector((state) => state.user.value);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const hideSidebar = location.pathname.startsWith("/inbox");

  return userData ? (
    <div className="w-full flex min-h-screen">
      {!hideSidebar && (
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}

      <div className="flex-1 py-5">
        <Outlet />
      </div>

      {sidebarOpen ? (
        <X
          onClick={() => setSidebarOpen(false)}
          className="absolute top-2 left-2 z-10 p-1 h-8 w-8 text-gray-700 sm:hidden cursor-pointer"
        />
      ) : (
        <Menu
          onClick={() => setSidebarOpen(true)}
          className="absolute top-2 left-2 z-10 p-1 h-8 w-8 text-gray-700 sm:hidden cursor-pointer"
        />
      )}
    </div>
  ) : (
    <Loading />
  );
}
