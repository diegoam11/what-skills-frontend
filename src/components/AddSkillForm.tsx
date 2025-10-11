import { useState } from "react";
import { SearchableSelect } from "./SearchableSelect";
import { Select } from "./Select";
import type { SkillCategory } from "../Skills/SkillsLogic"; // Asumiendo la ruta

// CAMBIO 1: Separamos las habilidades en dos listas distintas.
const technicalSkills = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "rust", label: "Rust" },
  { value: "docker", label: "Docker" },
  { value: "kubernetes", label: "Kubernetes" },
  { value: "aws", label: "AWS" },
];

const softSkills = [
  { value: "comunicacion", label: "Comunicación" },
  { value: "trabajo_en_equipo", label: "Trabajo en Equipo" },
  { value: "resolucion_de_problemas", label: "Resolución de Problemas" },
  { value: "liderazgo", label: "Liderazgo" },
  { value: "pensamiento_critico", label: "Pensamiento Crítico" },
];

const proficiencyLevels = [
  { value: "basico", label: "Básico" },
  { value: "intermedio", label: "Intermedio" },
  { value: "avanzado", label: "Avanzado" },
];

interface AddSkillFormProps {
  onSkillAdd: (skill: { name: string; proficiency: string }) => void;
  onClose: () => void;
  // CAMBIO 2: Añadimos la categoría como una prop requerida.
  category: SkillCategory;
}

export const AddSkillForm: React.FC<AddSkillFormProps> = ({
  onSkillAdd,
  onClose,
  category, // Usamos la nueva prop
}) => {
  const [proficiency, setProficiency] = useState("");
  const [skillName, setSkillName] = useState("");
  const [error, setError] = useState("");

  // CAMBIO 3: Determinamos qué lista de habilidades mostrar
  // basado en la categoría que recibimos como prop.
  const availableSkills =
    category === "Técnicas" ? technicalSkills : softSkills;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName) {
      setError("Por favor, selecciona una habilidad.");
      return;
    }
    if (!proficiency) {
      setError("Por favor, selecciona un nivel de dominio.");
      return;
    }
    onSkillAdd({ name: skillName, proficiency });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <SearchableSelect
        label="Habilidad"
        // CAMBIO 4: Usamos la lista de habilidades filtrada.
        options={availableSkills}
        value={skillName}
        onChange={(value) => {
          setSkillName(value);
          if (error) setError("");
        }}
        placeholder={`Ej: ${
          category === "Técnicas" ? "Python" : "Liderazgo"
        }...`}
      />

      <Select
        label="Nivel de dominio"
        options={proficiencyLevels}
        value={proficiency}
        onChange={(value) => {
          setProficiency(value);
          if (error) setError("");
        }}
        placeholder="Selecciona un nivel..."
      />

      {error && <p className="text-sm text-red-600 -my-2">{error}</p>}

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#0FBB82] text-white font-semibold rounded-xl hover:bg-[#0FAE7D] transition-colors shadow-sm cursor-pointer"
        >
          Agregar
        </button>
      </div>
    </form>
  );
};
