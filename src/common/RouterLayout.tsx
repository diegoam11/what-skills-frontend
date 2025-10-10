import { NavBar } from "./NavBar";
import { Sidebar } from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export const RouterLayout: React.FC = () => {
  return (
    <div id="/routerlayout" className="min-h-screen flex flex-col bg-[#F2FEF7]">
      <NavBar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
