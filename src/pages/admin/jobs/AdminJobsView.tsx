import React from "react";
import { AdminLayout } from "../AdminLayout";
import { useAdminJobsLogic } from "./AdminJobsLogic";
import { Briefcase, UploadCloud, CheckCircle, AlertCircle, Link as LinkIcon } from "lucide-react";
import { Spinner } from "../../../components/Spinner";

export const AdminJobsView: React.FC = () => {
  const { formData, handleChange, handleIngest, isLoading, result, error } = useAdminJobsLogic();

  return (
    <AdminLayout>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Briefcase className="text-indigo-600" size={32} />
            Ingesta de Ofertas
          </h1>
          <p className="text-gray-600 mt-2">
            Pega aquí la descripción de una oferta laboral para que la IA la analice, extraiga habilidades y la guarde en la base de datos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLUMNA IZQUIERDA: FORMULARIO */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <form onSubmit={handleIngest} className="space-y-6">
                
                {/* Fuente y URL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fuente</label>
                    <select
                      name="source"
                      value={formData.source}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Bumeran">Bumeran</option>
                      <option value="Computrabajo">Computrabajo</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL de la oferta (Opcional)</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-3 text-gray-400" size={18} />
                      <input
                        type="url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        placeholder="https://..."
                        className="w-full pl-10 p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Texto Raw */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción de la oferta (Copy-Paste)
                  </label>
                  <textarea
                    name="rawText"
                    value={formData.rawText}
                    onChange={handleChange}
                    rows={12}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm leading-relaxed"
                    placeholder="Pega aquí todo el texto de la oferta..."
                    required
                  />
                </div>

                {/* Botón Submit */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                  >
                    {isLoading ? (
                      <>
                        <Spinner size="sm" /> Procesando con IA...
                      </>
                    ) : (
                      <>
                        <UploadCloud size={20} /> Procesar Oferta
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* COLUMNA DERECHA: RESULTADOS / STATUS */}
          <div className="space-y-6">
            {/* Tarjeta de Instrucciones */}
            {!result && !error && (
              <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                <h3 className="font-semibold text-indigo-900 mb-2">¿Cómo funciona?</h3>
                <ul className="text-sm text-indigo-700 space-y-2 list-disc list-inside">
                  <li>Copia el texto completo de LinkedIn.</li>
                  <li>La IA detectará el <strong>Título del Puesto</strong>.</li>
                  <li>Extraerá las <strong>Habilidades Técnicas y Blandas</strong>.</li>
                  <li>Generará un <strong>Vector Matemático</strong> para búsquedas.</li>
                </ul>
              </div>
            )}

            {/* Tarjeta de Error */}
            {error && (
              <div className="bg-red-50 rounded-2xl p-6 border border-red-200 flex gap-3 items-start animate-fadeIn">
                <AlertCircle className="text-red-600 shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-red-900">Error</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Tarjeta de Éxito (Resultado) */}
            {result && (
              <div className="bg-green-50 rounded-2xl p-6 border border-green-200 animate-fadeIn">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                  <h3 className="font-bold text-green-900">¡Ingesta Exitosa!</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg border border-green-100">
                    <p className="text-xs text-gray-500 uppercase font-bold">Título Detectado</p>
                    <p className="text-gray-800 font-medium">{result.title}</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border border-green-100">
                    <p className="text-xs text-gray-500 uppercase font-bold">Skills Encontradas</p>
                    <p className="text-2xl font-bold text-[#0FBB82]">{result.skills_found}</p>
                  </div>

                  <p className="text-xs text-green-700 mt-2 text-center">
                    La oferta ya está disponible para el análisis de brechas.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};