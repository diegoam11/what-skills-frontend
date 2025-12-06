import React from "react";
import { useDashboardLogic } from "./DashboardLogic";
import { EmployabilityChart } from "../../components/EmployabilityChart";
import { ProfileCompletionCard } from "../../components/ProfileCompletionCard";
import { SkillsHighlightsCard } from "../../components/SkillsHighlightsCard";
import { ImprovementGapsCard } from "../../components/ImprovementGapsCard";
import { Spinner } from "../../components/Spinner";
import { Link } from "react-router-dom";

export const DashboardView: React.FC = () => {
  const {
    user,
    employability,
    profileCompletion,
    skills,
    improvements,
    isLoading
  } = useDashboardLogic();

  if (isLoading) {
    return <div className="flex justify-center p-10"><Spinner size="lg" /></div>;
  }

  // 1. Caso: Usuario sin objetivo profesional definido
  if (!user?.job_target && !user?.career_target) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md shadow-sm">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Para analizar tu empleabilidad, necesitamos saber qué buscas.
              <Link to="/profile" className="font-bold underline ml-1 hover:text-yellow-800">
                Configura tu Objetivo Profesional aquí.
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Título Simple (Sin saludo, como pediste) */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Resumen General</h1>
      </div>

      {/* Fila superior: Gráficos de Estado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EmployabilityChart {...employability} />
        <ProfileCompletionCard {...profileCompletion} />
      </div>

      {/* Fila inferior: Detalle de Habilidades (Con manejo de estado vacío) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.length === 0 && improvements.length === 0 ? (
            // CASO: No se encontraron ofertas o coincidencias en la BD
            <div className="col-span-1 md:col-span-2 text-center py-12 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
                <p className="text-gray-500 font-medium">
                    Aún no tenemos suficientes datos de mercado para tu perfil.
                </p>
                <p className="text-sm text-gray-400 mt-1">
                    Intenta agregar más habilidades o espera a que procesemos nuevas ofertas.
                </p>
            </div>
        ) : (
            // CASO: Hay datos (Skills validadas o Brechas)
            <>
                <SkillsHighlightsCard skills={skills} />
                <ImprovementGapsCard improvements={improvements} />
            </>
        )}
      </div>
    </div>
  );
};