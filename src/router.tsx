import { Routes, Route } from "react-router-dom";
import { RouterLayout } from "./common/RouterLayout";
import { RegisterView } from "./pages/register/RegisterView";
import { DashboardView } from "./pages/dashboard/DashboardView";
import { LoginView } from "./pages/login/LoginView";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/dashboard" element={<DashboardView />}></Route>
      </Route>
      <Route path="/register" element={<RegisterView />}></Route>
      <Route path="/login" element={<LoginView />}></Route>
    </Routes>
  );
};
