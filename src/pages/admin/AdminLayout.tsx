import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Users, CreditCard, LogOut } from "lucide-react";
import { mockAuthService } from "../../services/mockAuthService";

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const handleLogout = () => {
    mockAuthService.logout();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <h2 className="text-xl font-bold text-gray-900">🛡️ Panel Admin</h2>
              <div className="flex gap-4">
                <Link
                  to="/admin/users"
                  className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                    location.pathname === "/admin/users"
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Usuarios
                </Link>
                <Link
                  to="/admin/plans"
                  className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                    location.pathname === "/admin/plans"
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  Planes
                </Link>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      {children}
    </div>
  );
};
