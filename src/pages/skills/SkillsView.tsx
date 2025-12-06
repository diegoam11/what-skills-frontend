import { useState, useRef } from "react";
import { useSkillsLogic } from "./SkillsLogic";
import type { Skill, SkillCategoryVisual, SkillProficiency } from "../../types/domain/Skill";
import { Plus, Trash2, UploadCloud, Edit2 } from "lucide-react"; // <--- Importamos Edit2
import { Modal } from "../../components/Modal";
import { AddSkillForm } from "../../components/AddSkillForm";
import { Spinner } from "../../components/Spinner";

// Función auxiliar para agrupar
const groupSkillsByCategory = (
  skills: Skill[]
): Record<SkillCategoryVisual, Skill[]> => {
  const grouped: Record<SkillCategoryVisual, Skill[]> = {
    "Técnicas": [],
    "Blandas": [],
  };

  skills.forEach((skill) => {
    const cat = skill.category.toLowerCase();
    if (cat === "técnica" || cat === "herramienta" || cat === "lenguaje" || cat === "framework") {
      grouped["Técnicas"].push(skill);
    } else {
      grouped["Blandas"].push(skill);
    }
  });
  return grouped;
};

export const SkillsView: React.FC = () => {
  const {
    skills,
    isLoading,
    handleDeleteSkill,
    handleAddSkill,
    isExtracting,
    handleAddSkillsFromCV,
  } = useSkillsLogic();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryForNewSkill, setCategoryForNewSkill] = useState<SkillCategoryVisual | null>(null);
  
  // NUEVO ESTADO: Para saber qué skill estamos editando
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  
  const [formKey, setFormKey] = useState(Date.now());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleAddSkillsFromCV(file);
      event.target.value = ""; 
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[300px]">
        <Spinner />
      </div>
    );
  }

  const groupedSkills = groupSkillsByCategory(skills);

  // Abrir modal para NUEVA skill
  const handleOpenModal = (category: SkillCategoryVisual) => {
    setEditingSkill(null); // Aseguramos que no estamos editando
    setFormKey(Date.now());
    setCategoryForNewSkill(category);
    setIsModalOpen(true);
  };

  // Abrir modal para EDITAR skill (NUEVA FUNCIÓN)
  const handleEditClick = (skill: Skill, category: SkillCategoryVisual) => {
    setEditingSkill(skill); // Guardamos la skill a editar
    setCategoryForNewSkill(category);
    setFormKey(Date.now()); // Forzamos recarga del form
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCategoryForNewSkill(null);
    setEditingSkill(null); // Limpiamos estado de edición
  };

  const handleFormSubmit = (skillData: {
    name: string;
    proficiency: SkillProficiency;
  }) => {
    if (categoryForNewSkill) {
      // Tu lógica handleAddSkill ya maneja actualizaciones en el backend
      // así que sirve tanto para crear como para editar.
      handleAddSkill(skillData, categoryForNewSkill);
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
          <div>
            <input
              type="file"
              accept=".pdf"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <button
              onClick={handleUploadClick}
              disabled={isExtracting}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition cursor-pointer disabled:bg-indigo-300 disabled:cursor-not-allowed"
            >
              {isExtracting ? (
                <>
                  <Spinner size="sm" />
                  Extrayendo...
                </>
              ) : (
                <>
                  <UploadCloud size={16} />
                  Extraer desde CV
                </>
              )}
            </button>
          </div>
        </div>

        {(Object.keys(groupedSkills) as SkillCategoryVisual[]).map((category) => (
          <div key={category} className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold capitalize">{category}</h2>
              <button
                onClick={() => handleOpenModal(category)}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-[#0FBB82] text-white font-semibold rounded-xl hover:bg-[#0FAE7D] transition cursor-pointer"
              >
                <Plus size={16} />
                Añadir
              </button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {groupedSkills[category].length > 0 ? (
                groupedSkills[category].map((skill) => (
                  <div
                    key={skill.id}
                    className={`text-sm font-medium px-3 py-1.5 rounded-full flex items-center gap-2 ${
                      category === "Técnicas" 
                        ? "bg-sky-100 text-sky-800" 
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    <span>
                      {skill.name} <span className="opacity-70 text-xs">({skill.proficiency})</span>
                    </span>
                    
                    {/* BOTÓN EDITAR */}
                    <button
                      onClick={() => handleEditClick(skill, category)}
                      className="hover:text-indigo-600 transition-colors cursor-pointer ml-2"
                      title="Editar nivel"
                    >
                      <Edit2 size={14} />
                    </button>

                    {/* BOTÓN ELIMINAR */}
                    <button
                      onClick={() => handleDeleteSkill(skill.name)} 
                      className="hover:text-red-600 transition-colors cursor-pointer ml-1"
                      title="Eliminar habilidad"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic">No tienes habilidades {category.toLowerCase()} registradas.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        // Cambiamos el título dinámicamente
        title={`${editingSkill ? "Editar" : "Añadir"} Habilidad (${categoryForNewSkill})`}
      >
        {categoryForNewSkill && (
          <AddSkillForm
            key={formKey}
            onClose={handleCloseModal}
            onSkillAdd={handleFormSubmit}
            category={categoryForNewSkill}
            // Pasamos los datos iniciales si estamos editando
            initialName={editingSkill?.name}
            initialProficiency={editingSkill?.proficiency}
          />
        )}
      </Modal>
    </>
  );
};