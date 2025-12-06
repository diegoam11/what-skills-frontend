import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Briefcase, TrendingUp, AlertCircle } from "lucide-react";

interface Props {
  score: number;      // 0 a 100
  level: string;      // "Bajo", "Medio", "Alto"
  totalJobs: number;  // Ofertas analizadas
  missingSkillsCount: number; 
}

export const EmployabilityChart: React.FC<Props> = ({
  score,
  level,
  totalJobs,
  missingSkillsCount,
}) => {
  
  // Colores dinámicos según el score
  const getColor = (val: number) => {
    if (val >= 80) return "#0FBB82"; // Verde
    if (val >= 50) return "#FBBF24"; // Amarillo
    return "#F87171";                // Rojo
  };

  const activeColor = getColor(score);

  // Datos para el gráfico de torta (Score vs Restante)
  const data = [
    { name: "Score", value: score },
    { name: "Rest", value: 100 - score },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col w-full h-full justify-between">
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-1">Tu Nivel de Empleabilidad</h2>
        <p className="text-sm text-gray-500">Basado en tu compatibilidad con el mercado actual.</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4">
        {/* GRÁFICO CIRCULAR */}
        <div className="relative w-40 h-40 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={75}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                <Cell fill={activeColor} />
                <Cell fill="#F3F4F6" /> {/* Gris de fondo */}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Texto Central */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold text-gray-800">{score}%</span>
            <span className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 mt-1">
              {level}
            </span>
          </div>
        </div>

        {/* METRICAS LATERALES */}
        <div className="flex flex-col gap-4 w-full sm:w-auto">
          
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="p-2 bg-white rounded-lg shadow-sm text-indigo-600">
              <Briefcase size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase">Base de Datos</p>
              <p className="text-sm font-semibold text-gray-800">
                {totalJobs === 0 ? "Sin datos" : `${totalJobs} ofertas analizadas`}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="p-2 bg-white rounded-lg shadow-sm text-amber-600">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase">Brechas</p>
              <p className="text-sm font-semibold text-gray-800">
                {missingSkillsCount === 0 
                  ? "¡Perfil completo!" 
                  : `${missingSkillsCount} habilidades por mejorar`}
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-2 text-xs text-center text-gray-400">
        * Calculado comparando tus habilidades con requisitos reales.
      </div>
    </div>
  );
};