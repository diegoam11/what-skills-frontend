import React from "react";
import { useUserProfileLogic } from "./UserProfileLogic";
import { SearchableSelect } from "../../components/SearchableSelect";
import { Select } from "../../components/Select";
import { Save } from "lucide-react";

export const UserProfileView: React.FC = () => {
  const { 
    formData, 
    handleChange, 
    handleSelectChange, 
    handleSave, 
    isLoading, 
    message,
    lists 
  } = useUserProfileLogic();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Mi Perfil</h1>
      </div>

      {/* Mensaje de Feedback (Éxito/Error) */}
      {message && (
        <div className={`p-4 mb-6 rounded-xl border ${
          message.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-700' 
            : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8">
        
        {/* Sección: Datos Personales */}
        <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Datos Personales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
                <input 
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0FBB82] outline-none transition-all"
                    placeholder="Tus nombres"
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                <input 
                    name="lastName" 
                    value={formData.lastName} 
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0FBB82] outline-none transition-all"
                    placeholder="Tus apellidos"
                />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email (No editable)</label>
                    <input 
                        value={formData.email} 
                        disabled
                        className="w-full p-2.5 border border-gray-200 bg-gray-50 rounded-xl text-gray-500 cursor-not-allowed"
                    />
                </div>
            </div>
        </section>

        <hr className="border-gray-100" />

        {/* Sección: Objetivos Profesionales */}
        <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Objetivos Profesionales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <SearchableSelect 
                        label="Carrera o Especialidad"
                        options={lists.careers} // Datos de masterData via Logic
                        value={formData.career}
                        // Adaptamos el evento del Select al formato del Logic
                        onChange={(val) => handleSelectChange('career', val)}
                        placeholder="Selecciona tu carrera..."
                    />
                </div>
                <div>
                    <SearchableSelect 
                        label="Puesto Objetivo"
                        options={lists.jobs} // Datos de masterData via Logic
                        value={formData.job}
                        onChange={(val) => handleSelectChange('job', val)}
                        placeholder="Selecciona el puesto..."
                    />
                </div>
                <div>
                    <Select 
                        label="Nivel Académico"
                        options={lists.academicLevels}
                        value={formData.academicLevel}
                        onChange={(val) => handleSelectChange('academicLevel', val)}
                        placeholder="Selecciona tu nivel..."
                    />
                </div>
            </div>
        </section>

        {/* Botón de Guardado */}
        <div className="flex justify-end pt-4">
            <button 
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center gap-2 bg-[#0FBB82] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#0FAE7D] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95 transform"
            >
            <Save size={20} />
            {isLoading ? "Guardando..." : "Guardar Cambios"}
            </button>
        </div>

      </div>
    </div>
  );
};