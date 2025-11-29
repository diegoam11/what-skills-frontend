export interface Plan {
  id: string;
  code: string;        // Ej: 'TRIAL', 'MONTHLY'
  name: string;
  description: string;
  price: number;
  durationDays: number;
  isTrial: boolean;
  isActive: boolean;
  features: string[];
  displayOrder?: number;
}