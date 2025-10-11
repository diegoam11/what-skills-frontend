import { useState, useEffect } from "react";
import type { Skill } from "../../types";

export type SkillCategory = "Técnicas" | "Blandas";

// Función segura para leer el objeto completo de userData de localStorage
const getUserData = (): any => {
  try {
    const data = localStorage.getItem("userData");
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Error al leer userData de localStorage:", error);
    return {};
  }
};

export const useSkillsLogic = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carga inicial de habilidades desde localStorage
  useEffect(() => {
    console.log("Cargando habilidades desde localStorage...");
    setIsLoading(true);
    const userData = getUserData();
    // Si userData tiene un array de skills, lo usamos. Si no, empezamos con un array vacío.
    setSkills(userData.skills || []);
    setIsLoading(false);
  }, []);

  // Función para guardar el array completo de skills en localStorage
  const saveSkillsToStorage = (updatedSkills: Skill[]) => {
    try {
      const currentData = getUserData();
      const updatedUserData = {
        ...currentData,
        skills: updatedSkills,
      };
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      console.log("Habilidades guardadas en localStorage:", updatedUserData);
    } catch (error) {
      console.error("Error al guardar habilidades en localStorage:", error);
    }
  };

  const handleDeleteSkill = (skillId: string) => {
    console.log("Eliminando habilidad:", skillId);
    const updatedSkills = skills.filter((s) => s.id !== skillId);
    setSkills(updatedSkills); // Actualiza el estado de React
    saveSkillsToStorage(updatedSkills); // Persiste el cambio en localStorage
  };

  const handleAddSkill = (
    newSkill: { name: string; proficiency: string },
    category: SkillCategory
  ) => {
    console.log(
      `Agregando habilidad '${newSkill.name}' a la categoría '${category}'`
    );

    // Obtenemos el label legible de la habilidad seleccionada
    const skillLabel =
      allTechnicalSkills
        .concat(allSoftSkills)
        .find((s) => s.value === newSkill.name)?.label || newSkill.name;

    const skillToAdd: Skill = {
      id: `s${Date.now()}`, // ID temporal
      name: skillLabel, // Guardamos el label legible
      category: category === "Técnicas" ? "herramienta" : "blanda",
      proficiency: newSkill.proficiency,
    };

    const updatedSkills = [...skills, skillToAdd];
    setSkills(updatedSkills); // Actualiza el estado de React
    saveSkillsToStorage(updatedSkills); // Persiste el cambio en localStorage
  };

  return { skills, isLoading, handleDeleteSkill, handleAddSkill };
};

// Se mueven aquí para que handleAddSkill pueda buscar el label
const allTechnicalSkills = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "rust", label: "Rust" },
  { value: "docker", label: "Docker" },
  { value: "kubernetes", label: "Kubernetes" },
  { value: "aws", label: "AWS" },
];

const allSoftSkills = [
  { value: "comunicacion", label: "Comunicación" },
  { value: "trabajo_en_equipo", label: "Trabajo en Equipo" },
  { value: "resolucion_de_problemas", label: "Resolución de Problemas" },
  { value: "liderazgo", label: "Liderazgo" },
  { value: "pensamiento_critico", label: "Pensamiento Crítico" },
];
