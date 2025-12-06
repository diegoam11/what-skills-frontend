import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/auth";
import { careers as careersList, jobs as jobsList } from "../../utils/masterData";
import type { RegisterRequest } from "../../api/endpoints";

export const useRegisterLogic = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Estado Limpio (Sin universidad ni semestre)
  const [formData, setFormData] = useState<RegisterRequest>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    career: '',
    job: '',
    // Inicializamos como undefined o vacíos si TS se queja, 
    // pero al ser opcionales en la interfaz, podemos omitirlos aquí.
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejo especial para los Selects (si usas componentes custom)
  const handleSelectChange = (name: string, value: string, label?: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
      [`${name}Label`]: label // Guardamos el label por si acaso (visual)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // 2. Validación básica
      if (!formData.email || !formData.password || !formData.first_name) {
        throw new Error("Por favor completa los campos obligatorios.");
      }

      // 3. Llamada al Servicio (El adaptador se encarga del resto)
      await authService.register(formData);
      
      // 4. Redirección al éxito
      navigate('/dashboard'); 
      
    } catch (err: any) {
      console.error("Error en registro:", err);
      // Intentamos mostrar el mensaje que viene del backend (ej. "Email ya registrado")
      const message = err.response?.data?.detail || err.message || "Error al registrarse";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    error,
    isLoading,
    handleChange,
    handleSelectChange,
    handleSubmit,
    // Agregamos las listas para que la Vista las pueda usar
    careers: careersList || [], 
    jobs: jobsList || []
  };
};
