import { apiClient } from './base';
import type { User } from '../types/domain/User';
import type { Skill, SkillCategoryBackend } from '../types/domain/Skill';


export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  career: string;
  job: string;
  university?: string;
  semester?: number;
  jobLabel?: string;
  careerLabel?: string;
}

export interface RegisterBackendPayload {
  email: string;
  password: string;
  full_name: string;
  career_target: string;
  job_target: string;
}

export interface UserUpdateRequest {
  full_name?: string;
  job_target?: string;
  career_target?: string;
  academic_level?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface Experience {
  title: string;
  company: string;
  duration_months: number;
  description: string;
  skills_used: string[];
}

export interface Education {
  degree: string;
  institution: string;
  gpa?: number;
  graduation_year?: number;
}

export interface EmployabilityData {
  user_id: string;
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  projects: string[];
  certifications: string[];
  languages: string[];
  updated_at: string;
}

export interface EmployabilityScore {
  user_id: string;
  overall_score: number;
  technical_score: number;
  experience_score: number;
  education_score: number;
  soft_skills_score: number;
  calculated_at: string;
}

export interface Recommendation {
  user_id: string;
  type: string;
  title: string;
  description: string;
  priority: number;
  category: string;
  url?: string;
  estimated_impact: number;
  created_at: string;
}

export interface SkillAddRequest {
  name: string;
  proficiency: string;
  category: SkillCategoryBackend;
}

export interface GapItem {
  name: string;
  level_required: string;
  frequency: number;
  reason: string;
}

export interface SkillMatch {
  name: string;
  level: string;
}

export interface EmployabilityReport {
  score: number;
  market_fit: string;
  analyzed_jobs: number;
  top_missing_skills: GapItem[];
  top_present_skills: SkillMatch[];
  analyzed_job_titles: string[];
}

export interface JobIngestRequest {
  raw_text: string;
  url?: string;
  source?: string;
}

export interface JobIngestResponse {
  id: string;
  title: string;
  skills_found: number;
  message: string;
}

export interface Plan {
  id?: number; // Opcional al crear
  code: string;
  name: string;
  description: string;
  price: number;
  duration_days: number; // Backend manda snake_case
  is_trial: boolean;
  is_active: boolean;
  features: string[];
  display_order: number;
}

// Authentication API
export const authAPI = {
  login: (data: LoginRequest): Promise<AuthResponse> =>
    apiClient.post('/auth/login', data).then(res => res.data),

  register: (data: RegisterBackendPayload): Promise<User> =>
    apiClient.post('/auth/register', data).then(res => res.data),

  getCurrentUser: (): Promise<User> =>
    apiClient.get('/auth/me').then(res => res.data),

  updateProfile: (data: UserUpdateRequest): Promise<User> =>
    apiClient.put('/auth/me', data).then(res => res.data),
};

// Employability API
export const employabilityAPI = {

  getAnalysis: (): Promise<EmployabilityReport> => 
    apiClient.get('/employability/analyze').then(res => res.data),
  /*
  getScore: (): Promise<EmployabilityScore> =>
    apiClient.get('/employability/score').then(res => res.data),

  getData: (): Promise<EmployabilityData> =>
    apiClient.get('/employability/data').then(res => res.data),

  updateData: (data: EmployabilityData): Promise<EmployabilityScore> =>
    apiClient.post('/employability/data', data).then(res => res.data),

  getHistory: (): Promise<EmployabilityScore[]> =>
    apiClient.get('/employability/history').then(res => res.data),

  getRecommendations: (): Promise<Recommendation[]> =>
    apiClient.get('/employability/recommendations').then(res => res.data),*/
};

// Reports API
export const reportsAPI = {
  getUniversityReport: (universityName: string): Promise<any> =>
    apiClient.get(`/reports/university/${universityName}`).then(res => res.data),

  getAnalyticsOverview: (): Promise<any> =>
    apiClient.get('/reports/analytics/overview').then(res => res.data),
};

// Users API
export const usersAPI = {
  getAllUsers: (): Promise<User[]> =>
    apiClient.get('/users/').then(res => res.data),

  getUserById: (userId: string): Promise<User> =>
    apiClient.get(`/users/${userId}`).then(res => res.data),
};


// Skills API
export const skillsAPI = {
  // Obtener habilidades del usuario (GET /api/v1/skills/me)
  getMySkills: (): Promise<SkillAddRequest[]> => 
    apiClient.get('/skills/me').then(res => res.data),

  // Agregar una habilidad (POST /api/v1/skills/me)
  addSkill: (data: SkillAddRequest): Promise<SkillAddRequest> => 
    apiClient.post('/skills/me', data).then(res => res.data),
   
  //Borrar skill por nombre
  deleteSkill: (skillName: string): Promise<void> => 
    apiClient.delete(`/skills/me/${encodeURIComponent(skillName)}`).then(res => res.data),
};

// Jobs API
export const jobsAPI = {
  ingest: (data: JobIngestRequest): Promise<JobIngestResponse> => 
    apiClient
      .post('/jobs/ingest', data, { timeout: 60000 }) // 60s
      .then(res => res.data),
};

// --- PLANS API ---
export const plansAPI = {
  getAll: (): Promise<Plan[]> => 
    apiClient.get('/plans/').then(res => res.data),

  create: (plan: Plan): Promise<Plan> => 
    apiClient.post('/plans/', plan).then(res => res.data),

  update: (id: number, plan: Plan): Promise<Plan> => 
    apiClient.put(`/plans/${id}`, plan).then(res => res.data),

  delete: (id: number): Promise<void> => 
    apiClient.delete(`/plans/${id}`).then(res => res.data),

  subscribe: (planCode: string): Promise<any> => 
    apiClient.post(`/plans/subscribe/${planCode}`).then(res => res.data),

  cancel: (): Promise<any> => 
    apiClient.post('/plans/cancel').then(res => res.data),
};
