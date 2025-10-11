import { Bell, UserCircle, LogOut } from "lucide-react";
import { authService } from "../services/authService";
import { NotificationDropdown } from "./NotificationDropdown";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const NavBar: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const handleLogout = () => {
    authService.logout();
    window.location.href = "/login";
  };

  useEffect(() => {
    try {
      const userDataString = localStorage.getItem("userData");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setDisplayName(userData.displayName || "");
      }
    } catch (error) {
      console.error("Error al leer o parsear userData de localStorage", error);
    }
  }, []);

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 px-6 py-3 flex items-center justify-between">
      {/* Sección Izquierda: Logo */}
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 bg-[#0FBB82] rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">WS</span>
        </div>
        <h1 className="text-lg font-semibold text-gray-800 hidden md:block">
          What Skills
        </h1>
      </div>

      {/* CAMBIO: Se eliminó el mensaje de bienvenida de aquí */}

      {/* Sección Derecha: Acciones */}
      <div className="flex items-center gap-4">
        {/* CAMBIO: Se movió el mensaje de bienvenida aquí, a la izquierda de los íconos */}
        {displayName && (
          <span className="text-gray-600 font-medium hidden lg:block">
            ¡Bienvenido, {displayName}!
          </span>
        )}

        <Link
          to="/profile"
          className="flex items-center gap-1.5 p-2 rounded-full hover:bg-gray-100 transition-colors"
          title="Perfil"
        >
          <UserCircle size={22} className="text-gray-600" />
        </Link>

        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="flex items-center gap-1.5 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            title="Notificaciones"
          >
            <Bell size={22} className="text-gray-600" />
          </button>
          {showNotifications && (
            <NotificationDropdown onClose={() => setShowNotifications(false)} />
          )}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-[#0FBB82] text-white pl-3 pr-4 py-2 text-sm font-semibold rounded-xl hover:bg-[#0FAE7D] transition cursor-pointer"
          title="Salir"
        >
          <LogOut size={18} />
          <span className="hidden sm:block">Salir</span>
        </button>
      </div>
    </header>
  );
};
