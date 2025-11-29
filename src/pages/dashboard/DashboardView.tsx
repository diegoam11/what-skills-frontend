import { RefreshCw, Sparkles } from "lucide-react";
import { useDashboardLogic } from "./DashboardLogic";
import { EmployabilityChart } from "../../components/EmployabilityChart";
import { ProfileCompletionCard } from "../../components/ProfileCompletionCard";
import { SkillsHighlightsCard } from "../../components/SkillsHighlightsCard";
import { ImprovementGapsCard } from "../../components/ImprovementGapsCard";
import { FileUploader } from "../../components/FileUploader";
import { motion } from "framer-motion";

export const DashboardView: React.FC = () => {
  const { employability, profileCompletion, skills, improvements } =
    useDashboardLogic();

  const handleUploadComplete = (data: any) => {
    console.log("Analysis complete:", data);
    // Here we would update the dashboard state with the new data
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 p-2"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            Hola, Usuario <span className="text-2xl">👋</span>
          </h1>
          <p className="text-gray-500 mt-1">Aquí tienes el resumen de tu perfil profesional hoy.</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-emerald-700 font-medium px-4 py-2 rounded-xl hover:bg-emerald-50 transition-colors border border-emerald-100 shadow-sm cursor-pointer">
          <RefreshCw size={18} /> <span>Actualizar Datos</span>
        </button>
      </div>

      {/* AI Analysis Section (CV Upload) */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4 opacity-90">
              <Sparkles size={20} />
              <span className="font-medium tracking-wide text-sm uppercase">AI Powered</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              Descubre tu potencial <br /> profesional real
            </h2>
            <p className="text-emerald-100 mb-8 max-w-md text-lg">
              Sube tu CV y deja que nuestra IA analice tus habilidades, detecte brechas y te recomiende el mejor camino.
            </p>
            <div className="flex gap-4">
              <div className="flex flex-col">
                <span className="text-3xl font-bold">95%</span>
                <span className="text-sm text-emerald-200">Precisión</span>
              </div>
              <div className="w-px bg-emerald-500/50 h-full mx-2"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">2s</span>
                <span className="text-sm text-emerald-200">Análisis</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Sube tu CV</h3>
          <FileUploader onUploadComplete={handleUploadComplete} />
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <EmployabilityChart {...employability} />
        </motion.div>
        <motion.div variants={item}>
          <ProfileCompletionCard {...profileCompletion} />
        </motion.div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <SkillsHighlightsCard skills={skills} />
        </motion.div>
        <motion.div variants={item}>
          <ImprovementGapsCard improvements={improvements} />
        </motion.div>
      </div>
    </motion.div>
  );
};
