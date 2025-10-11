import { useState } from "react";

export const useDashboardLogic = () => {
  const [employability] = useState({
    score: 78,
    level: "Bueno",
    marketFit: 82,
    profileDemand: 75,
    recommendations: 4,
  });

  const [profileCompletion] = useState({
    progress: 70,
    sections: [
      { label: "Añade tu formación", completed: false },
      { label: "Experiencia laboral", completed: false },
      { label: "Idiomas", completed: false },
    ],
  });

  const [skills] = useState([
    { name: "Python", level: "Senior", tag: "Alta demanda" },
    { name: "SQL", level: "Avanzado", tag: "Fuerte" },
    { name: "Comunicación", level: "Avanzado", tag: "Valorado" },
  ]);

  const [improvements] = useState([
    { name: "Cloud", level: "Intermedio", tag: "Reforzar" },
    { name: "Arquitectura", level: "Básico", tag: "Prioridad" },
    { name: "Inglés", level: "B2", tag: "Certificar" },
  ]);

  return {
    employability,
    profileCompletion,
    skills,
    improvements,
  };
};