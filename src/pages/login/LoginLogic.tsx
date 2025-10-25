import { useState } from "react";
import { mockAuthService } from "../../services/mockAuthService";

export const useLoginLogic = () => {
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
      
      // Redirigir a la raíz y dejar que App.tsx maneje la redirección según el rol
      window.location.href = "/";
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
