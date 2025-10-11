import { useState } from 'react';
import { useSkillsLogic } from './SkillsLogic';
import { Plus, Trash2 } from 'lucide-react';
import { Modal } from '../../components/Modal';
import { AddSkillForm } from '../../components/AddSkillForm';
import type { Skill } from '../../types';

// Helper para agrupar habilidades por categoría
const groupSkillsByCategory = (skills: Skill[]) => {
    return skills.reduce((acc, skill) => {
        (acc[skill.category] = acc[skill.category] || []).push(skill);
        return acc;
    }, {}as Record<string, Skill[]>);
};


export const SkillsView: React.FC = () => {
  const { skills, isLoading, handleDeleteSkill, handleAddSkill } = useSkillsLogic();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return <div>Cargando habilidades...</div>;
  }
  
  const groupedSkills = groupSkillsByCategory(skills);

  return (
    <>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Mi Inventario de Habilidades</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0FBB82] text-white font-[600] rounded-xl hover:bg-green-700 transition"
          >
            <Plus size={18} />
            Añadir Habilidad
          </button>
        </div>

        {Object.entries(groupedSkills).map(([category, skillsInCategory]) => (
            <div key={category} className="bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4 capitalize">{category}</h2>
                <div className="flex flex-wrap gap-3">
                    {(skillsInCategory as Skill[]).map(skill => (
                        <div key={skill.id} className="bg-sky-100 text-sky-800 text-sm font-medium px-3 py-1.5 rounded-full flex items-center gap-2">
                            <span>{skill.name} ({skill.proficiency})</span>
                            <button onClick={() => handleDeleteSkill(skill.id)} className="hover:text-red-500">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        ))}

      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Agregar Nueva Habilidad">
        <AddSkillForm 
            onClose={() => setIsModalOpen(false)}
            onSkillAdd={handleAddSkill}
        />
      </Modal>
    </>
  );
};