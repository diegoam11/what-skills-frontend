import React from 'react';
import { Link } from 'react-router-dom';
import { RegisterLogic } from './RegisterLogic';
import { SearchableSelect } from '../../components/SearchableSelect';

export const RegisterView: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    career,
    setCareer,
    job,
    setJob,
    careers,
    jobs,
    loading,
    error,
    handleSubmit
  } = RegisterLogic();

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

        <form className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-lg" onSubmit={handleSubmit}>
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0FBB82] focus:border-[#0FBB82] focus:outline-none"
                placeholder="••••••••"
                required
              />
              <p className="mt-1 text-xs text-gray-500">Mínimo 6 caracteres</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0FBB82] focus:border-[#0FBB82] focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Career */}
            <div>
              <SearchableSelect
                label="Carrera"
                options={careers}
                value={career}
                onChange={setCareer}
                placeholder="Selecciona tu carrera..."
              />
            </div>

            {/* Job */}
            <div>
              <SearchableSelect
                label="Puesto laboral deseado"
                options={jobs}
                value={job}
                onChange={setJob}
                placeholder="Selecciona el puesto..."
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#0FBB82] hover:bg-[#0FAE7D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0FBB82] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="font-medium text-[#0FBB82] hover:text-[#0FAE7D]">
                Inicia sesión
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
