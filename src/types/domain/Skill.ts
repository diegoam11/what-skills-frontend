export type SkillCategory = 'Técnicas' | 'Blandas' | 'herramienta' | 'lenguaje' | 'framework' | 'blanda';
export type SkillProficiency = 'Básico' | 'Intermedio' | 'Avanzado';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: SkillProficiency; // 'Básico', 'Intermedio', 'Avanzado', etc.
  verified?: boolean; // Preparado para el futuro
}