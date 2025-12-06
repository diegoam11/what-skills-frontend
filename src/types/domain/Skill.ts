export type SkillCategoryBackend = 'técnica' | 'blanda'; 

// Para la UI, seguimos usando Plural/Capitalizado si prefieres
export type SkillCategoryVisual = 'Técnicas' | 'Blandas';

export type SkillProficiency = 'Básico' | 'Intermedio' | 'Avanzado';

export interface Skill {
  id: string; // Puede ser UUID o string temporal
  name: string;
  category: SkillCategoryBackend; // Lo que viene de la API
  proficiency: SkillProficiency;
  verified?: boolean;
}