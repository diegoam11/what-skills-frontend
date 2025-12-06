import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/auth"; // <--- Usamos la abstracción
import { careers, jobs, academicLevels } from "../../utils/masterData";

export const useUserProfileLogic = () => {
  const { user, refreshUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Estado del formulario visual
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    career: "",      // Mapea a career_target
    job: "",         // Mapea a job_target
    // Solo visual por ahora
    academicLevel: "",
  });

  // 1. Cargar datos del usuario al entrar
  useEffect(() => {
    if (user) {
      // Separamos "Juan Pérez" en "Juan" y "Pérez" visualmente
      const names = (user.full_name || "").split(" ");
      // Estrategia simple: El último es apellido, todo lo anterior es nombre
      const lastNameRaw = names.length > 1 ? names.pop() : "";
      const firstNameRaw = names.join(" ");

      setFormData({
        firstName: firstNameRaw || "",
        lastName: lastNameRaw || "",
        email: user.email,
        career: user.career_target || "",
        job: user.job_target || "",
        academicLevel: user.academic_level || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Para los SearchableSelect
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage(null);
    try {
      // 2. Unimos los nombres para el Backend
      const fullNameCombined = `${formData.firstName} ${formData.lastName}`.trim();

      // 3. Llamamos al servicio con la interfaz correcta
      await authService.updateProfile({
        full_name: fullNameCombined,
        job_target: formData.job,
        career_target: formData.career,
        academic_level: formData.academicLevel
      });

      // 4. Importante: Recargar el contexto para que el NavBar se actualice
      await refreshUser();

      setMessage({ text: "¡Perfil actualizado con éxito!", type: 'success' });

      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setMessage(null), 3000);

    } catch (error) {
      console.error(error);
      setMessage({ text: "Error al guardar los cambios.", type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSelectChange,
    handleSave,
    isLoading,
    message,
    lists: { careers, jobs, academicLevels }
  };
};