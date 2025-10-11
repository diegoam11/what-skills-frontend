import { Bell, UserCircle, LogOut } from "lucide-react";
import { authService } from "../services/authService";
import { NotificationDropdown } from "./NotificationDropdown";
import { useState } from "react";
import { Link } from "react-router-dom";

export const NavBar: React.FC = () => {
  const handleLogout = () => {
    authService.logout();
  };

  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-12 w-12 bg-[#0FBB82] rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">WS</span>
        </div>
        <h1 className="text-lg font-semibold text-gray-800">What Skills</h1>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/profile"
          className="flex items-center gap-1.5 bg-white text-gray-800 font-[500] px-3 py-1.5 rounded-xl hover:bg-gray-300 transition border-2 border-[#E8F5E9]"
        >
          <UserCircle size={20} /> <span className="text-sm">Perfil</span>
        </Link>

        <button
          onClick={() => setShowNotifications((prev) => !prev)}
          className="flex items-center gap-1.5 bg-white text-gray-800 font-[500] px-3 py-1.5 rounded-xl hover:bg-gray-300 transition border-2 border-[#E8F5E9] cursor-pointer"
        >
          <Bell size={20} /> <span className="text-sm">Alertas</span>
        </button>
        {showNotifications && (
          <NotificationDropdown onClose={() => setShowNotifications(false)} />
        )}

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 bg-[#0FBB82] text-white px-3 py-1.5 text-[80%] font-[600] rounded-xl hover:bg-green-700 transition cursor-pointer"
        >
          <LogOut size={20} /> <span className="text-sm">Salir</span>
        </button>
      </div>
    </header>
  );
};
