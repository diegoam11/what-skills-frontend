import { useState, useEffect } from 'react';
import type { UserProfile } from '../../types';

// Simulación de una llamada a la API para obtener los datos del perfil
const fetchUserProfile = async (): Promise<UserProfile> => {
  console.log("Fetching user profile...");
  // Datos de ejemplo
  const mockProfile: UserProfile = {
    firstName: 'Ana',
    lastName: 'García',
    email: 'ana.garcia@email.com',
    headline: 'Desarrolladora de Software con pasión por la IA',
    workExperiences: [
      { id: 'we1', role: 'Desarrolladora Backend', company: 'Tech Solutions', startDate: '2022-01', endDate: 'Presente', description: 'Desarrollo de APIs REST...' },
    ],
    education: [
      { id: 'edu1', institution: 'Universidad Nacional', degree: 'Ingeniería de Sistemas', startDate: '2017', endDate: '2021' },
    ],
  };
  return new Promise(resolve => setTimeout(() => resolve(mockProfile), 1000));
};

export const useProfileLogic = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      const data = await fetchUserProfile();
      setProfile(data);
      setIsLoading(false);
    };
    loadProfile();
  }, []);

  const handleSave = async () => {
    if (!profile) return;
    console.log("Saving profile:", profile);
    // TODO: Implementar la llamada a la API para guardar los datos
    alert("¡Perfil guardado con éxito! (Simulación)");
  };

  return { profile, setProfile, isLoading, handleSave };
};