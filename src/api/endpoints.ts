import { apiClient } from './base';

// Types for API responses
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  career: string;
  university: string;
  semester: number;
  created_at: string;
}

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
  university: string;
  semester: number;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface Skill {
  name: string;
  category: string;
  proficiency: number;
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

// Authentication API
export const authAPI = {
  login: (data: LoginRequest): Promise<AuthResponse> =>
    apiClient.post('/auth/login', data).then(res => res.data),
  
  register: (data: RegisterRequest): Promise<User> =>
    apiClient.post('/auth/register', data).then(res => res.data),
  
  getCurrentUser: (): Promise<User> =>
    apiClient.get('/auth/me').then(res => res.data),
};

// Employability API
export const employabilityAPI = {
  getScore: (): Promise<EmployabilityScore> =>
    apiClient.get('/employability/score').then(res => res.data),
  
  getData: (): Promise<EmployabilityData> =>
    apiClient.get('/employability/data').then(res => res.data),
  
  updateData: (data: EmployabilityData): Promise<EmployabilityScore> =>
    apiClient.post('/employability/data', data).then(res => res.data),
  
  getHistory: (): Promise<EmployabilityScore[]> =>
    apiClient.get('/employability/history').then(res => res.data),
  
  getRecommendations: (): Promise<Recommendation[]> =>
    apiClient.get('/employability/recommendations').then(res => res.data),
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
