import { useState, useEffect } from "react";
import type { Skill } from "../../types";
import * as pdfjs from "pdfjs-dist";
// Usar el worker desde node_modules (mismo que la versión instalada)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

import axios, { AxiosError } from "axios";

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

const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;

const API_URL = "https://api.deepseek.com/v1/chat/completions";

// --- Lógica para leer el PDF ---
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

// --- Nueva función para llamar a DeepSeek con el texto del CV ---
const extractSkillsFromCV = async (cvText: string) => {
  // Este prompt es CRUCIAL. Le dice al modelo exactamente qué hacer y cómo formatear la salida.
  const prompt = `
    Analiza el siguiente texto extraído de un currículum vitae (CV) e identifica las habilidades técnicas y blandas.
    Responde ÚNICAMENTE con un objeto JSON válido, sin texto introductorio ni explicaciones adicionales.
    El objeto debe tener dos claves: "habilidadesTecnicas" y "habilidadesBlandas".
    Cada clave debe contener un array de strings con las habilidades encontradas.
    Si no encuentras habilidades en una categoría, devuelve un array vacío.

    Ejemplo de respuesta esperada:
    {
      "habilidadesTecnicas": ["React", "TypeScript", "Node.js", "AWS", "Docker"],
      "habilidadesBlandas": ["Comunicación efectiva", "Trabajo en equipo", "Liderazgo"]
    }

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
        // Importante: pedir que la respuesta sea un objeto JSON
        response_format: { type: "json_object" },
        temperature: 0.2, // Baja temperatura para respuestas más predecibles
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
      }
    );

    const content = response.data.choices[0].message.content;
    // El modelo a veces devuelve el JSON como un string, hay que parsearlo.
    return JSON.parse(content);
  } catch (error) {
    console.error("Error al extraer habilidades con DeepSeek:", error);
    throw error; // Propaga el error para que la UI pueda manejarlo
  }
};

export const testDeepSeekAPI = async () => {
  console.log("Probando la API de DeepSeek...");
  return;
  try {
    const response = await axios.post(
      API_URL,
      // Payload (lo que enviamos)
      {
        model: "deepseek-chat", // Puedes cambiar a "deepseek-coder"
        messages: [
          {
            role: "user",
            content: "Hola, ¿quién eres?",
          },
        ],
        max_tokens: 100,
        temperature: 0.7,
      },
      // Headers (autenticación)
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
      }
    );

    // Si todo sale bien, muestra la respuesta del modelo
    console.log("¡Conexión exitosa!");
    console.log("---------------------------------------");
    const choice = response.data.choices[0];
    console.log("Respuesta del modelo:", choice.message.content);
    console.log("---------------------------------------");
    console.log("Tokens usados:", response.data.usage.total_tokens);
  } catch (error) {
    // Manejo de errores
    console.error("Error al conectar con la API de DeepSeek:");

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // El servidor respondió con un error (ej. clave incorrecta, modelo inválido)
        console.error("Status:", axiosError.response.status);
        console.error(
          "Data:",
          JSON.stringify(axiosError.response.data, null, 2)
        );
      } else if (axiosError.request) {
        // La solicitud se hizo pero no hubo respuesta
        console.error("No se recibió respuesta del servidor.");
      } else {
        // Error al configurar la solicitud
        console.error("Error:", axiosError.message);
      }
    } else {
      // Otro tipo de error
      console.error("Error inesperado:", error);
    }
  }
};

export const useSkillsLogic = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExtracting, setIsExtracting] = useState(false);

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

  const handleAddSkillsFromCV = async (file: File) => {
    setIsExtracting(true);
    try {
      // 1. Extraer texto del PDF
      console.log("Extrayendo texto del PDF...");
      const cvText = await extractTextFromPdf(file);

      // 2. Enviar a DeepSeek y obtener habilidades
      console.log("Enviando texto a DeepSeek para análisis...");
      const extractedSkills = await extractSkillsFromCV(cvText);

      // 3. Formatear y añadir las nuevas habilidades
      const newSkillsToAdd: Skill[] = [];

      extractedSkills.habilidadesTecnicas?.forEach((skillName: string) => {
        newSkillsToAdd.push({
          id: `s${Date.now()}${Math.random()}`,
          name: skillName,
          category: "herramienta", // Categoría por defecto
          proficiency: "Intermedio", // Nivel por defecto
        });
      });

      extractedSkills.habilidadesBlandas?.forEach((skillName: string) => {
        newSkillsToAdd.push({
          id: `s${Date.now()}${Math.random()}`,
          name: skillName,
          category: "blanda",
          proficiency: "Avanzado", // Nivel por defecto
        });
      });

      // 4. Actualizar el estado (evitando duplicados por nombre)
      const currentSkillNames = new Set(
        skills.map((s) => s.name.toLowerCase())
      );
      const uniqueNewSkills = newSkillsToAdd.filter(
        (s) => !currentSkillNames.has(s.name.toLowerCase())
      );

      if (uniqueNewSkills.length > 0) {
        const updatedSkills = [...skills, ...uniqueNewSkills];
        setSkills(updatedSkills);
        saveSkillsToStorage(updatedSkills);
        console.log(`${uniqueNewSkills.length} nuevas habilidades añadidas.`);
      } else {
        console.log("No se encontraron nuevas habilidades para añadir.");
      }
    } catch (error) {
      console.error("Falló el proceso de extracción de CV:", error);
      alert("Hubo un error al procesar el CV. Por favor, intenta de nuevo.");
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
