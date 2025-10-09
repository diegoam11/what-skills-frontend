import { RefreshCw, Plus, } from "lucide-react";
import { useDashboardLogic } from "./DashboardLogic";
import { EmployabilityChart } from "../../components/EmployabilityChart";
import { ProfileCompletionCard } from "../../components/ProfileCompletionCard";
import { SkillsHighlightsCard } from "../../components/SkillsHighlightsCard";
import { ImprovementGapsCard } from "../../components/ImprovementGapsCard";

export const DashboardView: React.FC = () => {
  const { employability, profileCompletion, skills, improvements } =
    useDashboardLogic();

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-[1rem]">
        <button className="flex items-center gap-1.5 bg-white text-gray-800 font-[500] px-3 py-1.5 rounded-xl hover:bg-gray-300 transition border-2 border-[#E8F5E9]">
          <RefreshCw size={20} /> <span className="text-sm">Actualizar</span>
        </button>

        <button className="flex items-center gap-1.5 bg-[#0FBB82] text-white px-3 py-1.5 text-[80%] font-[600] rounded-xl hover:bg-green-700 transition">
          <Plus size={20} /> <span className="text-sm">Agregar habilidad</span>
        </button>
      </div>
      <h1 className="text-2xl font-semibold text-gray-800">
        Dashboard inicial
      </h1>

      {/* Fila superior */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EmployabilityChart {...employability} />
        <ProfileCompletionCard {...profileCompletion} />
      </div>

      {/* Fila inferior */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SkillsHighlightsCard skills={skills} />
        <ImprovementGapsCard improvements={improvements} />
      </div>
    </div>
  );
};