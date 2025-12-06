import type { Skill } from "./Skill";

export type UserRole = 'admin' | 'user';

export interface Subscription {
  planId: string;
  planName: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  isTrial: boolean;
}

export interface User {
  // --- Campos Base (Coinciden con Backend) ---
  id: string;
  email: string;
  role: UserRole;
  created_at?: string; // Python envía: created_at

  // --- Datos de Perfil ---
  full_name?: string;     // Python envía: full_name
  job_target?: string;    // Python envía: job_target
  career_target?: string;
  academic_level?: string; // Python envía: career_target

  // --- Relaciones ---
  skills?: Skill[];       // A futuro: Lista de habilidades
  
  // Lo marcamos opcional (?) porque el backend aún no lo envía
  currentSubscription?: Subscription; 
}