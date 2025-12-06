import { Bell, UserCircle, LogOut } from "lucide-react";
import { NotificationDropdown } from "./NotificationDropdown";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // <--- Importamos el contexto

export const NavBar: React.FC = () => {
  const { user, logout } = useAuth(); // <--- Datos reales y función logout
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    // El contexto limpiará el estado y AppRoutes redirigirá al login automáticamente.
    // Si quieres forzar una recarga limpia del navegador:
    // window.location.href = "/login"; 
  };

  // Preparamos el nombre para mostrar (o el email si no hay nombre)
  const displayName = user?.full_name || user?.email?.split("@")[0] || "Usuario";

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      
      {/* Sección Izquierda: Logo */}
      <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
        <div className="h-10 w-10 bg-[#0FBB82] rounded-lg flex items-center justify-center shadow-sm">
          <span className="text-white font-bold text-lg">WS</span>
        </div>
        <h1 className="text-lg font-bold text-gray-800 hidden md:block tracking-tight">
          What Skills
        </h1>
      </Link>

      {/* Sección Derecha: Info Usuario y Acciones */}
      <div className="flex items-center gap-4">
        
        {/* INFO DEL USUARIO (Nombre y Cargo) */}
        {user && (
          <div className="hidden lg:flex flex-col items-end mr-1">
            <span className="text-gray-800 font-semibold text-sm leading-tight">
              {displayName}
            </span>
            {user.job_target && (
              <span className="text-xs text-[#0FBB82] font-medium bg-green-50 px-2 py-0.5 rounded-full mt-0.5">
                {user.job_target}
              </span>
            )}
          </div>
        )}

        {/* Separador vertical sutil */}
        <div className="h-6 w-px bg-gray-200 hidden lg:block mx-1"></div>

        {/* Botón Perfil */}
        <Link
          to="/profile"
          className="flex items-center gap-1.5 p-2 rounded-full hover:bg-gray-100 transition-colors group relative"
          title="Mi Perfil"
        >
          <UserCircle size={24} className="text-gray-600 group-hover:text-[#0FBB82] transition-colors" />
        </Link>

        {/* Botón Notificaciones */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="flex items-center gap-1.5 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer group"
            title="Notificaciones"
          >
            <Bell size={22} className="text-gray-600 group-hover:text-[#0FBB82] transition-colors" />
            {/* Puntito rojo si hubiera notificaciones nuevas (puedes lógica después) */}
            {/* <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border border-white"></span> */}
          </button>
          
          {showNotifications && (
            <NotificationDropdown onClose={() => setShowNotifications(false)} />
          )}
        </div>

        {/* Botón Salir */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 pl-3 pr-4 py-2 text-sm font-medium rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all cursor-pointer ml-2"
          title="Cerrar Sesión"
        >
          <LogOut size={18} />
          <span className="hidden sm:block">Salir</span>
        </button>
      </div>
    </header>
  );
};