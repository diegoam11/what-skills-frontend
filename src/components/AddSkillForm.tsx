import { useState } from "react";
import { SearchableSelect } from "./SearchableSelect";
import { Select } from "./Select";
import type { SkillCategory, SkillProficiency } from "../types/domain/Skill";
import { allTechnicalSkills, allSoftSkills, proficiencyLevels } from "../utils/masterData";


interface AddSkillFormProps {
  onSkillAdd: (skill: { name: string; proficiency: SkillProficiency }) => void;
  onClose: () => void;
  category: SkillCategory;
  
  //Para editar
  initialName?: string;
  initialProficiency?: SkillProficiency;
}

export const AddSkillForm: React.FC<AddSkillFormProps> = ({
  onSkillAdd,
  onClose,
  category,
  initialName = "",
  initialProficiency = "",
}) => {
  // 3. Estado tipado: Puede ser un nivel válido O vacío al inicio
  const [proficiency, setProficiency] = useState<SkillProficiency | "">(initialProficiency);
  const [skillName, setSkillName] = useState(initialName);
  const [error, setError] = useState("");

  const availableSkills =
    category === "Técnicas" ? allTechnicalSkills : allSoftSkills;

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

    // 4. Al enviar, TypeScript ya sabe que NO es vacío por la validación anterior
    onSkillAdd({
      name: skillName,
      proficiency: proficiency as SkillProficiency
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <SearchableSelect
        label="Habilidad"
        options={availableSkills}
        value={skillName}
        onChange={(value) => {
          setSkillName(value);
          if (error) setError("");
        }}
        placeholder={initialName ? initialName : `Ej: ${category === "Técnicas" ? "Python" : "Liderazgo"}...`}
      />

      <Select
        label="Nivel de dominio"
        options={proficiencyLevels} // <--- Usa la lista de masterData que coincide con tu imagen
        value={proficiency}
        onChange={(value) => {
          // Casteamos el valor del select al tipo estricto
          setProficiency(value as SkillProficiency);
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
          {initialName ? "Actualizar" : "Añadir"}
        </button>
      </div>
    </form>
  );
};