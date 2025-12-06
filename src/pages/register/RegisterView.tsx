import React from "react";
import { Link } from "react-router-dom";
import { useRegisterLogic } from "./RegisterLogic";
import { SearchableSelect } from "../../components/SearchableSelect";
// Asegúrate de importar las opciones si no vienen del hook, 
// o si 'careers' y 'jobs' vienen de useRegisterLogic, déjalo así.
// Por lo general vienen de masterData, pero asumiré que tu Logic las exporta.

export const RegisterView: React.FC = () => {
  // Usamos la nueva estructura que definimos en RegisterLogic
  const {
    formData,
    handleChange,
    handleSelectChange,
    handleSubmit,
    isLoading,
    error,
    // Asegúrate de que tu RegisterLogic exporte estas listas, 
    // si no, impórtalas directamente de masterData aquí.
    careers,
    jobs,
  } = useRegisterLogic();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center items-center">
            <div className="h-16 w-16 bg-[#0FBB82] rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xl">WS</span>
            </div>
            <h1 className="ml-2 text-xl font-bold">What skills?</h1>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Crear cuenta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Únete a WhatSkills y descubre tu potencial de empleabilidad
          </p>
        </div>

        <form
          className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-lg"
          onSubmit={handleSubmit}
        >
          {/* Mensaje de Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">

            {/* --- NUEVO: Nombres y Apellidos (Grid de 2 columnas) --- */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                  Nombres
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0FBB82] focus:border-[#0FBB82] focus:outline-none"
                  placeholder="Juan"
                  required
                />
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                  Apellidos
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  value={formData.last_name}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0FBB82] focus:border-[#0FBB82] focus:outline-none"
                  placeholder="Pérez"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0FBB82] focus:border-[#0FBB82] focus:outline-none"
                placeholder="tu@email.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0FBB82] focus:border-[#0FBB82] focus:outline-none"
                placeholder="••••••••"
                required
              />
              <p className="mt-1 text-xs text-gray-500">Mínimo 6 caracteres</p>
            </div>

            {/* Career (Select) */}
            <div>
              <SearchableSelect
                label="Carrera"
                options={careers}
                value={formData.career}
                // CORRECCIÓN: Agregamos los tipos :string y :string | undefined
                onChange={(value: string, label?: string) => handleSelectChange("career", value, label)}
                placeholder="Selecciona tu carrera..."
              />
            </div>

            {/* Job (Select) */}
            <div>
              <SearchableSelect
                label="Puesto laboral deseado"
                options={jobs}
                value={formData.job}
                // CORRECCIÓN: Lo mismo aquí
                onChange={(value: string, label?: string) => handleSelectChange("job", value, label)}
                placeholder="Selecciona el puesto..."
              />
            </div>

            {/* NOTA: Eliminamos University y Semester de la vista */}

          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#0FBB82] hover:bg-[#0FAE7D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0FBB82] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
            >
              {isLoading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="font-medium text-[#0FBB82] hover:text-[#0FAE7D]"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};