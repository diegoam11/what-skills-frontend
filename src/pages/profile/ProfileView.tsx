import { useProfileLogic } from './ProfileLogic';
import { Save } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { profile, setProfile, isLoading, handleSave } = useProfileLogic();

  if (isLoading) {
    return <div className="text-center">Cargando perfil...</div>;
  }

  if (!profile) {
    return <div className="text-center text-red-500">No se pudo cargar el perfil.</div>;
  }
  
  // Handlers para actualizar el estado anidado de forma inmutable
  const handleWorkChange = (index: number, field: string, value: string) => {
    const updatedExperiences = [...profile.workExperiences];
    updatedExperiences[index] = { ...updatedExperiences[index], [field]: value };
    setProfile({ ...profile, workExperiences: updatedExperiences });
  };
  
  const handleEducationChange = (index: number, field: string, value: string) => {
    const updatedEducation = [...profile.education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setProfile({ ...profile, education: updatedEducation });
  };


  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Mi Perfil Profesional</h1>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          <Save size={18} />
          Guardar Cambios
        </button>
      </div>

      {/* Tarjeta de Información Personal */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ... Aquí irían los inputs para nombre, apellido, email y titular ... */}
           <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input type="text" value={profile.firstName} onChange={(e) => setProfile({...profile, firstName: e.target.value})} className="mt-1 w-full p-2 border rounded-lg"/>
          </div>
          <div>
              <label className="block text-sm font-medium text-gray-700">Apellido</label>
              <input type="text" value={profile.lastName} onChange={(e) => setProfile({...profile, lastName: e.target.value})} className="mt-1 w-full p-2 border rounded-lg"/>
          </div>
        </div>
      </div>

      {/* Tarjeta de Experiencia Laboral */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Experiencia Laboral</h2>
        <div className="space-y-6">
          {profile.workExperiences.map((exp, index) => (
            <div key={exp.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
              <input placeholder="Cargo" value={exp.role} onChange={e => handleWorkChange(index, 'role', e.target.value)} className="p-2 border rounded-lg"/>
              <input placeholder="Empresa" value={exp.company} onChange={e => handleWorkChange(index, 'company', e.target.value)} className="p-2 border rounded-lg"/>
              <textarea placeholder="Descripción" value={exp.description} onChange={e => handleWorkChange(index, 'description', e.target.value)} className="md:col-span-2 p-2 border rounded-lg"/>
            </div>
          ))}
          <button className="text-sm text-green-600 hover:underline">+ Añadir experiencia</button>
        </div>
      </div>
      
       {/* Tarjeta de Educación */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Educación</h2>
        <div className="space-y-6">
            {profile.education.map((edu, index) => (
            <div key={edu.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
              <input placeholder="Institución" value={edu.institution} onChange={e => handleEducationChange(index, 'institution', e.target.value)} className="p-2 border rounded-lg"/>
              <input placeholder="Título" value={edu.degree} onChange={e => handleEducationChange(index, 'degree', e.target.value)} className="p-2 border rounded-lg"/>
            </div>
            ))}
           <button className="text-sm text-green-600 hover:underline">+ Añadir formación</button>
        </div>
      </div>
    </div>
  );
};