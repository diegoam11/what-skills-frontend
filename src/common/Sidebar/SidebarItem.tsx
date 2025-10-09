import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";

interface SidebarItemProps {
  to: string;
  icon: ReactNode;
  label: string;
  collapsed: boolean;
}

export const SidebarItem = ({ to, icon, label, collapsed }: SidebarItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors
         ${
           isActive
             ? "bg-[#D7FEDF] text-gray-700"
             : "text-gray-700 hover:bg-gray-100"
         }`
      }
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};