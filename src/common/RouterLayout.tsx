import { Outlet, NavLink } from "react-router-dom";
import{Home, Briefcase, Brain, User, Target, BookOpen, Bell, LogOut,}from "lucide-react";

export const RouterLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-green-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-green-100 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-10 text-green-800">Plataforma</h1>

          <nav className="space-y-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md transition ${
                  isActive
                    ? "bg-green-200 text-green-900 font-semibold"
                    : "hover:bg-green-50"
                }`
              }
            >
              <Home size={18} /> Dashboard
            </NavLink>

            <NavLink
              to="/empleos"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md transition ${
                  isActive
                    ? "bg-green-200 text-green-900 font-semibold"
                    : "hover:bg-green-50"
                }`
              }
            >
              <Briefcase size={18} /> Empleos
            </NavLink>

            <NavLink
              to="/habilidades"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md transition ${
                  isActive
                    ? "bg-green-200 text-green-900 font-semibold"
                    : "hover:bg-green-50"
                }`
              }
            >
              <Brain size={18} /> Habilidades
            </NavLink>

            <NavLink
              to="/perfil"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md transition ${
                  isActive
                    ? "bg-green-200 text-green-900 font-semibold"
                    : "hover:bg-green-50"
                }`
              }
            >
              <User size={18} /> Perfil
            </NavLink>
          </nav>

          <h2 className="text-sm mt-8 mb-2 text-gray-500 uppercase tracking-wider">
            Recursos
          </h2>

          <nav className="space-y-2">
            <NavLink
              to="/objetivos"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md transition ${
                  isActive
                    ? "bg-green-200 text-green-900 font-semibold"
                    : "hover:bg-green-50"
                }`
              }
            >
              <Target size={18} /> Objetivos
            </NavLink>

            <NavLink
              to="/aprendizaje"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md transition ${
                  isActive
                    ? "bg-green-200 text-green-900 font-semibold"
                    : "hover:bg-green-50"
                }`
              }
            >
              <BookOpen size={18} /> Aprendizaje
            </NavLink>
          </nav>
        </div>

        {/* Footer */}
        <div className="space-y-2">
          <button className="flex items-center gap-3 p-2 rounded-md hover:bg-green-50 w-full">
            <Bell size={18} /> Alertas
          </button>
          <button className="flex items-center gap-3 p-2 rounded-md hover:bg-green-50 w-full">
            <LogOut size={18} /> Salir
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
