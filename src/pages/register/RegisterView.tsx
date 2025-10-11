import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface RegisterFormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  career: string;
  university: string;
  semester: number;
}

export const RegisterView: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    career: '',
    university: '',
    semester: 1,
  });

  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'semester' ? parseInt(value) : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof RegisterFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterFormData> = {};

    if (!formData.first_name.trim()) newErrors.first_name = 'Nombre es requerido';
    if (!formData.last_name.trim()) newErrors.last_name = 'Apellido es requerido';
    if (!formData.email.trim()) newErrors.email = 'Email es requerido';
    if (!formData.password) newErrors.password = 'Contraseña es requerida';
    if (formData.password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    if (!formData.career.trim()) newErrors.career = 'Carrera es requerida';
    if (!formData.university.trim()) newErrors.university = 'Universidad es requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log('Register data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to dashboard after successful registration
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Registration error:', error);
      // Handle registration error
    } finally {
      setIsLoading(false);
    }
  };

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

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name fields */}
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
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0FBB82] focus:border-[#0FBB82] focus:outline-none"
                  placeholder="Juan"
                />
                {errors.first_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>
                )}
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
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0FBB82] focus:border-[#0FBB82] focus:outline-none"
                  placeholder="Pérez"
                />
                {errors.last_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>
                )}
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
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0FBB82] focus:border-[#0FBB82] focus:outline-none"
                placeholder="juan.perez@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password fields */}
            <div className="grid grid-cols-2 gap-4">
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
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0FBB82] focus:border-[#0FBB82] focus:outline-none"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirmar contraseña
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0FBB82] focus:border-[#0FBB82] focus:outline-none"
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Academic information */}
            <div>
              <label htmlFor="university" className="block text-sm font-medium text-gray-700">
                Universidad
              </label>
              <input
                id="university"
                name="university"
                type="text"
                value={formData.university}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0FBB82] focus:border-[#0FBB82] focus:outline-none"
                placeholder="Universidad Nacional Mayor de San Marcos"
              />
              {errors.university && (
                <p className="mt-1 text-sm text-red-600">{errors.university}</p>
              )}
            </div>

            <div>
              <label htmlFor="career" className="block text-sm font-medium text-gray-700">
                Carrera
              </label>
              <input
                id="career"
                name="career"
                type="text"
                value={formData.career}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0FBB82] focus:border-[#0FBB82] focus:outline-none"
                placeholder="Ingeniería de Sistemas"
              />
              {errors.career && (
                <p className="mt-1 text-sm text-red-600">{errors.career}</p>
              )}
            </div>

            <div>
              <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
                Ciclo académico
              </label>
              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0FBB82] focus:border-[#0FBB82] focus:outline-none"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>
                    {num}° Ciclo
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#0FBB82] hover:bg-[#0FAE7D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0FBB82] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
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
