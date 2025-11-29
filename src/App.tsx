import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { DashboardView } from "./pages/dashboard/DashboardView";
import { LoginView } from "./pages/login/LoginView";
import { RegisterView } from "./pages/register/RegisterView";
import { JobsView } from "./pages/jobs/JobsView";
import { SkillsView } from "./pages/skills/SkillsView";
import { GoalsView } from "./pages/goals/GoalsView";
import { LearningView } from "./pages/learning/LearningView";
import { RouterLayout } from "./common/RouterLayout";
import { UserProfileView } from "./pages/user-profile/UserProfileView";
import { AdminUsersView } from "./pages/admin/AdminUsersView";
import { AdminPlansView } from "./pages/admin/AdminPlansView";
import { PlansView } from "./pages/plans/plansView";
import { authService } from "./services/auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Intentamos "refrescar" la sesión al cargar la página
        const user = await authService.refreshToken();

        if (user) {
          setIsAuthenticated(true);
          setIsAdmin(user.role === 'admin');
          console.log('👤 Sesión restaurada:', user);
        } else {
          // Si no hay usuario (token inválido o no existe), limpiamos
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error inicializando auth:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              isAdmin ? <Navigate to="/admin/users" /> : <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginView /> : isAdmin ? <Navigate to="/admin/users" /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? <RegisterView /> : isAdmin ? <Navigate to="/admin/users" /> : <Navigate to="/dashboard" />
          }
        />

        {/* Rutas de Administrador (sin layout, simple) */}
        {isAuthenticated && isAdmin && (
          <>
            <Route path="/admin/users" element={<AdminUsersView />} />
            <Route path="/admin/plans" element={<AdminPlansView />} />
            <Route path="/admin" element={<Navigate to="/admin/users" />} />
          </>
        )}

        {/* Rutas protegidas de usuarios normales (dentro del layout) */}
        {isAuthenticated && !isAdmin && (
          <Route element={<RouterLayout />}>
            <Route path="/dashboard" element={<DashboardView />} />
            <Route path="/jobs" element={<JobsView />} />
            <Route path="/skills" element={<SkillsView />} />
            <Route path="/goals" element={<GoalsView />} />
            <Route path="/learning" element={<LearningView />} />
            <Route path="/profile" element={<UserProfileView />} />
            <Route path="/plans" element={<PlansView />} />
          </Route>
        )}

        {/* Catch-all */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? (isAdmin ? "/admin/users" : "/dashboard") : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
