import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { employabilityAPI, type EmployabilityReport } from "../../api/endpoints";

export const useDashboardLogic = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  // Estado para el reporte real del backend
  const [report, setReport] = useState<EmployabilityReport | null>(null);

  // Datos visuales procesados para los componentes
  const [employability, setEmployability] = useState({
    score: 0,
    level: "Calculando...",
    totalJobs: 0, // Antes "profileDemand"
    missingSkillsCount: 0, // Antes "recommendations"
  });

  const [profileCompletion, setProfileCompletion] = useState({
    progress: 0,
    sections: [] as { label: string; completed: boolean }[],
  });

  const [skills, setSkills] = useState<any[]>([]); 
  const [improvements, setImprovements] = useState<any[]>([]); 

  // 1. CARGAR ANÁLISIS REAL
  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!user) return;
      
      if (!user.job_target && !user.career_target) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await employabilityAPI.getAnalysis();
        setReport(data);

        // A. Actualizar Gráfico Principal (DATOS REALES)
        setEmployability({
          score: data.score,
          level: data.market_fit, // "Bajo", "Medio", "Alto"
          totalJobs: data.analyzed_jobs, // Número real de ofertas encontradas
          missingSkillsCount: data.top_missing_skills.length,
        });

        // B. Actualizar "Brechas a mejorar"
        const gapsMapped = data.top_missing_skills.map(gap => ({
          name: gap.name,
          level: gap.level_required,
          tag: "Te falta"
        }));
        setImprovements(gapsMapped);

        // C. Actualizar "Habilidades Destacadas"
        const presentMapped = data.top_present_skills.map((skill) => ({
          name: skill.name,
          level: skill.level,
          tag: "Tienes"
        }));
        setSkills(presentMapped);

      } catch (error) {
        console.error("Error obteniendo análisis:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [user]);

  // 2. CALCULAR PROGRESO (Igual que antes)
  useEffect(() => {
    if (user) {
      const sections = [
        { label: "Datos Personales", completed: !!user.full_name },
        { label: "Objetivo Profesional", completed: !!user.job_target },
        { label: "Habilidades Cargadas", completed: (skills.length > 0 || improvements.length > 0) }, 
      ];
      const completedCount = sections.filter(s => s.completed).length;
      const progress = Math.round((completedCount / sections.length) * 100);
      setProfileCompletion({ progress, sections });
    }
  }, [user, skills, improvements]);

  return {
    user,
    employability,
    profileCompletion,
    skills,
    improvements,
    isLoading
  };
}