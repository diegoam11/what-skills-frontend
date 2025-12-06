import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import { AdminJobsView } from "./pages/admin/jobs/AdminJobsView";

// IMPORTANTE: Importamos el Contexto
import { AuthProvider, useAuth } from "./context/AuthContext";

// --- COMPONENTE INTERNO: Maneja la lógica de rutas ---
function AppRoutes() {
  // Ahora obtenemos el estado desde el Contexto Global
  const { user, isLoading } = useAuth();
  
  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando sesión...</p>
        </div>
      </div>
    );
  }

  return (
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

      {/* Rutas de Administrador */}
      {isAuthenticated && isAdmin && (
        <>
          <Route path="/admin/users" element={<AdminUsersView />} />
          <Route path="/admin/plans" element={<AdminPlansView />} />
          <Route path="/admin/jobs" element={<AdminJobsView />} />
          <Route path="/admin" element={<Navigate to="/admin/users" />} />
        </>
      )}

      {/* Rutas protegidas de usuarios normales */}
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
  );
}

// --- COMPONENTE PRINCIPAL: Envuelve la app con AuthProvider ---
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;