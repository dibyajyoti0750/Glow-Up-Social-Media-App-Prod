import { NavLink } from "react-router-dom";
import { menuItemsData } from "../assets/assets";
import { useParams } from "react-router-dom";

export default function MenuItems({ setSidebarOpen }) {
  const { profileId } = useParams();

  return (
    <div className="text-gray-700 space-y-2 font-semibold">
      {menuItemsData.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) => {
            const isOwnProfile = label === "Profile" && !profileId && isActive;

            return `px-4 py-3 flex items-center gap-4 rounded-full ${
              isActive && (label !== "Profile" || isOwnProfile)
                ? "bg-blue-50 text-blue-800"
                : "hover:bg-gray-50"
            }`;
          }}
        >
          <Icon className="w-6 h-6" />
          {label}
        </NavLink>
      ))}
    </div>
  );
}
