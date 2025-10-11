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
import { mockAuthService } from "./services/mockAuthService";
import { UserProfileView } from "./pages/user-profile/UserProfileView";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar sesión activa usando mockAuthService
    setIsAuthenticated(mockAuthService.isAuthenticated());
    setLoading(false);
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
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginView /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? <RegisterView /> : <Navigate to="/dashboard" />
          }
        />

        {/* Rutas protegidas (dentro del layout) */}
        {isAuthenticated && (
          <Route element={<RouterLayout />}>
            <Route path="/dashboard" element={<DashboardView />} />
            <Route path="/jobs" element={<JobsView />} />
            <Route path="/skills" element={<SkillsView />} />
            <Route path="/goals" element={<GoalsView />} />{" "}
            {/* La ruta en tu sidebar era /users, la cambiamos a /goals para que sea más clara */}
            <Route path="/learning" element={<LearningView />} />
            <Route path="/profile" element={<UserProfileView />} />
          </Route>
        )}

        {/* Catch-all */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
