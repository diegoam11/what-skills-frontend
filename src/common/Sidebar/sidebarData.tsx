import { Home, BookOpen, Briefcase,GraduationCap, UserCog, CircleDot } from "lucide-react";
import type { ReactNode } from "react";

type SidebarItemDef = { path: string; label: string; icon: ReactNode };

export const sidebarData: { section: string; items: SidebarItemDef[] }[] = [
  {
    section: "General",
    items: [
      { path: "/dashboard", label: "Inicio", icon: <Home size={20} /> },
      { path: "/jobs", label: "Empleos", icon: <Briefcase size={20} /> },
      { path: "/skills", label: "Habilidades", icon: <GraduationCap size={20} /> },
      { path: "/profile", label: "Pefil", icon: <UserCog size={20} /> },
    ],
  },
  {
    section: "Recursos",
    items: [
      { path: "/users", label: "Objetivos", icon: <CircleDot size={20} /> },
      { path: "/learning", label: "Aprendizaje", icon: <BookOpen size={20} /> },
    ],
  },
];