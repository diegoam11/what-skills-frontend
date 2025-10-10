import { useState } from 'react';
import { SearchableSelect } from './SearchableSelect';

// Datos de ejemplo.
const allSkills = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'rust', label: 'Rust' },
  { value: 'docker', label: 'Docker' },
  { value: 'kubernetes', label: 'Kubernetes' },
  { value: 'aws', label: 'AWS' },
];

const proficiencyLevels = [
    { value: 'basico', label: 'Básico' },
    { value: 'intermedio', label: 'Intermedio' },
    { value: 'avanzado', label: 'Avanzado' },
];

interface AddSkillFormProps {
  onSkillAdd: (skill: { name: string; proficiency: string }) => void;
  onClose: () => void;
}

export const AddSkillForm: React.FC<AddSkillFormProps> = ({ onSkillAdd, onClose }) => {
  const [skillName, setSkillName] = useState('');
  const [proficiency, setProficiency] = useState('basico');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName) {
      setError('Por favor, selecciona una habilidad.');
      return;
    }
    // Llama a la función del padre para manejar la lógica de añadir
    onSkillAdd({ name: skillName, proficiency });
    onClose(); // Cierra el modal después de añadir
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <SearchableSelect
        label="Habilidad"
        options={allSkills}
        value={skillName}
        onChange={setSkillName}
        placeholder="Ej: Python, Docker..."
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nivel de dominio</label>
        <select
          value={proficiency}
          onChange={(e) => setProficiency(e.target.value)}
          className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
        >
          {proficiencyLevels.map(level => (
            <option key={level.value} value={level.value}>{level.label}</option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end gap-3 pt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
          Cancelar
        </button>
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Agregar Habilidad
        </button>
      </div>
    </form>
  );
};