import { useState, useEffect } from "react";
import type { Skill, SkillCategory, SkillProficiency } from "../../types/domain/Skill";
import { authService } from "../../services/auth"; // <--- USAR EL SERVICIO
import type { User } from "../../types/domain/User";
import { allTechnicalSkills, allSoftSkills } from "../../utils/masterData";

import * as pdfjs from "pdfjs-dist";
// Configuración del worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

import axios from "axios";


const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const API_URL = "https://api.deepseek.com/v1/chat/completions";

// --- Lógica para leer el PDF (Sin cambios) ---
const extractTextFromPdf = async (file: File): Promise<string> => {
  const fileReader = new FileReader();
  return new Promise((resolve, reject) => {
    fileReader.onload = async (event) => {
      try {
        const typedArray = new Uint8Array(event.target?.result as ArrayBuffer);
        const pdf = await pdfjs.getDocument(typedArray).promise;
        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          fullText += textContent.items.map((item: any) => item.str).join(" ");
        }
        resolve(fullText);
      } catch (error) {
        reject(error);
      }
    };
    fileReader.onerror = reject;
    fileReader.readAsArrayBuffer(file);
  });
};

// --- Llamada a DeepSeek (Sin cambios) ---
const extractSkillsFromCV = async (cvText: string) => {
  const prompt = `
    Analiza el siguiente texto extraído de un currículum vitae (CV) e identifica las habilidades técnicas y blandas.
    Responde ÚNICAMENTE con un objeto JSON válido...
    Texto del CV a analizar:
    ---
    ${cvText}
    ---
  `;

  try {
    const response = await axios.post(
      API_URL,
      {
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0.2,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
      }
    );
    const content = response.data.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error("Error al extraer habilidades con DeepSeek:", error);
    throw error;
  }
};

// --- HOOK PRINCIPAL ---
export const useSkillsLogic = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExtracting, setIsExtracting] = useState(false);

  // 1. Cargar habilidades usando authService
  useEffect(() => {
    console.log("Cargando habilidades del usuario actual...");
    setIsLoading(true);
    
    const user = authService.getCurrentUser();
    
    if (user && user.skills) {
      setSkills(user.skills);
    } else {
      setSkills([]);
    }
    setIsLoading(false);
  }, []);

  // 2. Función SEGURA para guardar en localStorage
  // NOTA: Como aún no tenemos backend para hacer authService.updateUser(data),
  // tenemos que hacer un "patch" manual al localStorage, pero usando los datos del servicio.
  const saveSkillsToStorage = (updatedSkills: Skill[]) => {
    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) return;

      const updatedUser: User = {
        ...currentUser,
        skills: updatedSkills,
      };

      // Guardamos la "verdad" actualizada
      // OJO: Esto sigue siendo un hack del Mock. 
      // Con backend real, aquí haríamos: await apiClient.post('/skills', updatedSkills)
      localStorage.setItem("userData", JSON.stringify(updatedUser));
      
      // Actualizamos también mockUsers para que persista si cerramos sesión
      const mockUsers = localStorage.getItem("mockUsers");
      if (mockUsers) {
        const usersArray = JSON.parse(mockUsers);
        const index = usersArray.findIndex((u: any) => u.id === currentUser.id);
        if (index !== -1) {
            // Cuidado: mockUsers tiene passwords, updatedUser no. 
            // Fusionamos para no perder la password del mock.
            usersArray[index] = { ...usersArray[index], ...updatedUser };
            localStorage.setItem("mockUsers", JSON.stringify(usersArray));
        }
      }

      console.log("Habilidades guardadas:", updatedUser);
    } catch (error) {
      console.error("Error al guardar habilidades:", error);
    }
  };

  const handleDeleteSkill = (skillId: string) => {
    const updatedSkills = skills.filter((s) => s.id !== skillId);
    setSkills(updatedSkills);
    saveSkillsToStorage(updatedSkills);
  };

  const handleAddSkill = (
    newSkill: { name: string; proficiency: SkillProficiency },
    category: SkillCategory
  ) => {
    // Buscamos el label bonito en nuestras listas maestras
    const skillLabel =
      allTechnicalSkills
        .concat(allSoftSkills)
        .find((s) => s.value === newSkill.name)?.label || newSkill.name;

    const skillToAdd: Skill = {
      id: `s${Date.now()}`,
      name: skillLabel,
      // Mapeamos la categoría de la UI a la categoría del Dominio
      category: category === "Técnicas" ? "herramienta" : "blanda",
      proficiency: newSkill.proficiency,
    };

    const updatedSkills = [...skills, skillToAdd];
    setSkills(updatedSkills);
    saveSkillsToStorage(updatedSkills);
  };

  const handleAddSkillsFromCV = async (file: File) => {
    setIsExtracting(true);
    try {
      const cvText = await extractTextFromPdf(file);
      const extractedSkills = await extractSkillsFromCV(cvText);
      const newSkillsToAdd: Skill[] = [];

      extractedSkills.habilidadesTecnicas?.forEach((skillName: string) => {
        newSkillsToAdd.push({
          id: `s${Date.now()}${Math.random()}`,
          name: skillName,
          category: "herramienta",
          proficiency: "Intermedio",
        });
      });

      extractedSkills.habilidadesBlandas?.forEach((skillName: string) => {
        newSkillsToAdd.push({
          id: `s${Date.now()}${Math.random()}`,
          name: skillName,
          category: "blanda",
          proficiency: "Avanzado",
        });
      });

      // Filtramos duplicados (case insensitive)
      const currentSkillNames = new Set(skills.map((s) => s.name.toLowerCase()));
      const uniqueNewSkills = newSkillsToAdd.filter(
        (s) => !currentSkillNames.has(s.name.toLowerCase())
      );

      if (uniqueNewSkills.length > 0) {
        const updatedSkills = [...skills, ...uniqueNewSkills];
        setSkills(updatedSkills);
        saveSkillsToStorage(updatedSkills);
        alert(`${uniqueNewSkills.length} habilidades añadidas.`);
      } else {
        alert("No se encontraron nuevas habilidades o ya las tenías agregadas.");
      }
    } catch (error) {
      console.error("Error en proceso CV:", error);
      alert("Error al procesar el CV.");
    } finally {
      setIsExtracting(false);
    }
  };

  return {
    skills,
    isLoading,
    handleDeleteSkill,
    handleAddSkill,
    isExtracting,
    handleAddSkillsFromCV,
  };
};