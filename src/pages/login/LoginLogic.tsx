import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockAuthService } from "../../services/mockAuthService";

export const useLoginLogic = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Intentar login con el servicio simulado
      await mockAuthService.login(email, password);
      
      // Si el login es exitoso, redirigir al dashboard
      navigate("/dashboard");
      
      // Recargar la página para actualizar el estado de autenticación
      window.location.reload();
    } catch (err: any) {
      console.error("Error en login:", err);
      setError(err.message || "Error al iniciar sesión. Verifica tus credenciales.");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleSubmit,
  };
};
