import { useState, useEffect } from "react";
import type { Skill, SkillCategoryBackend, SkillProficiency } from "../../types/domain/Skill";
import type { SkillCategoryVisual } from "../../types/domain/Skill"; // Importa el tipo visual
import { skillsAPI, type SkillAddRequest } from "../../api/endpoints";
import { apiClient } from "../../api/base";
import { allTechnicalSkills, allSoftSkills } from "../../utils/masterData";


interface ExtractedSkillBackend {
  name: string;
  proficiency: string; 
}


interface ExtractionResponse {
  habilidadesTecnicas: ExtractedSkillBackend[];
  habilidadesBlandas: ExtractedSkillBackend[];
}

export const useSkillsLogic = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExtracting, setIsExtracting] = useState(false);

  // 1. CARGAR HABILIDADES
  const loadSkills = async () => {
    setIsLoading(true);
    try {
      const mySkills = await skillsAPI.getMySkills();
      
      const mappedSkills: Skill[] = mySkills.map((s, index) => ({
        id: `server-${index}-${s.name}`, // ID único basado en nombre
        name: s.name,
        // TypeScript confiará en que viene como SkillCategoryBackend
        category: s.category as SkillCategoryBackend, 
        proficiency: s.proficiency as SkillProficiency,
      }));
      setSkills(mappedSkills);
    } catch (error) {
      console.error("Error cargando skills:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  // 2. AGREGAR HABILIDAD (Manual)
  // Recibe la categoría visual ("Técnicas") y la convierte a backend ("técnica")
  const handleAddSkill = async (newSkill: { name: string; proficiency: SkillProficiency }, categoryVisual: SkillCategoryVisual) => {
    try {
      // Normalizamos el nombre (Capitalización correcta si existe en masterData)
      const skillLabel = allTechnicalSkills.concat(allSoftSkills)
          .find((s) => s.value === newSkill.name)?.label || newSkill.name;

      // CORRECCIÓN CRÍTICA: Mapeo Visual -> Backend
      // "Técnicas" -> "técnica"
      // "Blandas" -> "blanda"
      const backendCategory: SkillCategoryBackend = categoryVisual === "Técnicas" ? "técnica" : "blanda";

      await skillsAPI.addSkill({
        name: skillLabel,
        proficiency: newSkill.proficiency,
        category: backendCategory 
      });

      await loadSkills(); 
      
    } catch (error) {
      console.error("Error guardando skill:", error);
      alert("Error al guardar la habilidad.");
    }
  };

  // 3. EXTRAER DE CV
  const handleAddSkillsFromCV = async (file: File) => {
    setIsExtracting(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await apiClient.post<ExtractionResponse>("/skills/extract-from-cv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const extracted = response.data;

      const promises: Promise<SkillAddRequest>[] = [];

      // CORRECCIÓN: Ahora enviamos "técnica" en lugar de "herramienta"
      extracted.habilidadesTecnicas.forEach((skill) => {
        promises.push(skillsAPI.addSkill({
          name: skill.name,
          proficiency: skill.proficiency || "Básico", // Usamos lo que dijo la IA
          category: "técnica" // <--- CAMBIO AQUÍ
        }));
      });

      extracted.habilidadesBlandas.forEach((skill) => {
        promises.push(skillsAPI.addSkill({
          name: skill.name,
          proficiency: skill.proficiency || "Básico",
          category: "blanda"
        }));
      });

      await Promise.all(promises);
      await loadSkills();
      alert(`CV Procesado. Se encontraron ${promises.length} habilidades.`);

    } catch (error) {
      console.error("Error procesando CV:", error);
      alert("Error al procesar el CV.");
    } finally {
      setIsExtracting(false);
    }
  };

  // 4. ELIMINAR HABILIDAD
  const handleDeleteSkill = async (skillName: string) => {
    // Actualización optimista (UI primero)
    const previousSkills = [...skills];
    setSkills(skills.filter(s => s.name !== skillName));

    try {
      await skillsAPI.deleteSkill(skillName);
    } catch (error) {
      console.error("Error eliminando skill:", error);
      alert("No se pudo eliminar la habilidad.");
      setSkills(previousSkills); // Revertir si falla
    }
  };

  return {
    skills,
    isLoading,
    handleDeleteSkill, // Ahora recibe el nombre, no el ID
    handleAddSkill,
    isExtracting,
    handleAddSkillsFromCV,
  };
};