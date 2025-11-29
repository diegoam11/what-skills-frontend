export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  headline: string;
  workExperiences: WorkExperience[];
  education: Education[];
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}