import { useState, useEffect } from "react";

export const DashboardLogic = () => {
  const [employabilityIndex, setEmployabilityIndex] = useState<number>(0);
  const [highlightedSkills, setHighlightedSkills] = useState<string[]>([]);
  const [skillsToImprove, setSkillsToImprove] = useState<string[]>([]);

  useEffect(() => {
    // Simulación temporal — luego se reemplazará por datos del backend o IA
    setTimeout(() => {
      setEmployabilityIndex(74);
      setHighlightedSkills([
        "Python",
        "React",
        "Machine Learning",
        "SQL",
        "Git",
      ]);
      setSkillsToImprove([
        "Data Engineering",
        "Cloud Deployment (AWS/GCP)",
        "CI/CD Pipelines",
      ]);
    }, 800);
  }, []);

  return {
    employabilityIndex,
    highlightedSkills,
    skillsToImprove,
  };
};