import { NavLink } from "react-router-dom";
import { menuItemsData } from "../assets/assets";

export default function MenuItems({ setSidebarOpen }) {
  return (
    <div className="px-6 text-gray-700 space-y-2 font-semibold">
      {menuItemsData.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `px-4 py-3 flex items-center gap-4 rounded-full ${
              isActive ? "bg-blue-50 text-blue-800" : "hover:bg-gray-50"
            }`
          }
        >
          <Icon className="w-6 h-6" />
          {label}
        </NavLink>
      ))}
    </div>
  );
}
