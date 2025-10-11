import { useState } from "react";
import { useSkillsLogic } from "./SkillsLogic";
import type { SkillCategory } from "./SkillsLogic";
import { Plus, Trash2 } from "lucide-react";
import { Modal } from "../../components/Modal";
import { AddSkillForm } from "../../components/AddSkillForm";
import type { Skill } from "../../types";
import { Spinner } from "../../components/Spinner";

const groupSkillsByCategory = (
  skills: Skill[]
): Record<SkillCategory, Skill[]> => {
  const grouped: Record<SkillCategory, Skill[]> = {
    Técnicas: [],
    Blandas: [],
  };

  skills.forEach((skill) => {
    if (
      ["lenguaje", "framework", "herramienta"].includes(
        skill.category.toLowerCase()
      )
    ) {
      grouped["Técnicas"].push(skill);
    } else if (skill.category.toLowerCase() === "blanda") {
      grouped["Blandas"].push(skill);
    }
  });
  return grouped;
};

export const SkillsView: React.FC = () => {
  const { skills, isLoading, handleDeleteSkill, handleAddSkill } =
    useSkillsLogic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryForNewSkill, setCategoryForNewSkill] =
    useState<SkillCategory | null>(null);
  const [formKey, setFormKey] = useState(Date.now());

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[300px]">
        <Spinner />
      </div>
    );
  }

  const groupedSkills = groupSkillsByCategory(skills);

  const handleOpenModal = (category: SkillCategory) => {
    setFormKey(Date.now());
    setCategoryForNewSkill(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCategoryForNewSkill(null);
  };

  const handleAddNewSkill = (newSkill: {
    name: string;
    proficiency: string;
  }) => {
    if (categoryForNewSkill) {
      handleAddSkill(newSkill, categoryForNewSkill);
      handleCloseModal();
    }
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Mis Habilidades
          </h1>
        </div>

        {(Object.keys(groupedSkills) as SkillCategory[]).map((category) => (
          <div key={category} className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold capitalize">{category}</h2>
              <button
                onClick={() => handleOpenModal(category)}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-[#0FBB82] text-white font-semibold rounded-xl hover:bg-green-700 transition cursor-pointer"
              >
                <Plus size={16} />
                Añadir
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {groupedSkills[category].map((skill) => (
                <div
                  key={skill.id}
                  className="bg-sky-100 text-sky-800 text-sm font-medium px-3 py-1.5 rounded-full flex items-center gap-2"
                >
                  <span>
                    {skill.name} ({skill.proficiency})
                  </span>
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="text-sky-500 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`Habilidades ${categoryForNewSkill || ""}`}
      >
        {/* Aseguramos que el formulario no se renderice si no hay categoría */}
        {categoryForNewSkill && (
          <AddSkillForm
            key={formKey}
            onClose={handleCloseModal}
            onSkillAdd={handleAddNewSkill}
            // CAMBIO: Pasamos la categoría seleccionada al formulario
            category={categoryForNewSkill}
          />
        )}
      </Modal>
    </>
  );
};
