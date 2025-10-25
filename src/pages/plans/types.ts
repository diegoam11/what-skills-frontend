// Tipos simplificados para esta vista

export interface Plan {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  durationDays: number;
  isTrial: boolean;
  isActive: boolean;
  features: string[];
}

export interface User {
  id: string;
  email: string;
  role: string;
  displayName: string;
  currentSubscription: {
    planId: string;
    planName: string;
    endDate: string;
    isActive: boolean;
    isTrial: boolean;
  };
  // ... otros campos que ya tienes
}
