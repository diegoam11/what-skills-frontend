import React from "react";
import { DashboardLogic } from "./DashboardLogic";
import { Plus, RefreshCw } from "lucide-react";

export const DashboardView: React.FC = () => {
  const { employabilityIndex, skillsToImprove, highlightedSkills } =
    DashboardLogic();

  return (
    <div className="min-h-screen bg-[#F2FEF7] p-8 pt-0">
      <div className="flex justify-end gap-[1rem] mt-0 pt-0">
        <button className="flex items-center gap-2 bg-white text-gray-800 font-[500] px-3 py-1.5 rounded-xl hover:bg-gray-300 transition border-2 border-[#E8F5E9]">
          <RefreshCw size={16} /> Actualizar
        </button>
        <button className="flex items-center gap-2 bg-[#0FBB82] text-white px-3 py-1.5 text-[80%] font-[600] rounded-xl hover:bg-green-700 transition">
          <Plus size={16} /> Agregar habilidad
        </button>
      </div>
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Panel de Empleabilidad
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-medium mb-4 text-gray-700">
            Índice de Empleabilidad
          </h2>
          <p className="text-4xl font-bold text-blue-600">
            {employabilityIndex}%
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-medium mb-4 text-gray-700">
            Habilidades Destacadas
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            {highlightedSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow md:col-span-2">
          <h2 className="text-xl font-medium mb-4 text-gray-700">
            Brechas a Mejorar
          </h2>
          <ul className="list-disc pl-6 space-y-1 text-red-600">
            {skillsToImprove.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
