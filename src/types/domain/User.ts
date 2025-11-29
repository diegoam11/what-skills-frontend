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
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  career?: string; // ID o value
  careerLabel?: string; // Nombre legible
  job?: string; // ID o value
  jobLabel?: string; // Nombre legible
  currentSubscription: Subscription;
  createdAt: string;
  skills?: Skill[];
}