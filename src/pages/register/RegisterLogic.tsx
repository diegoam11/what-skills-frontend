import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockAuthService } from "../../services/mockAuthService";

export const RegisterLogic = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [career, setCareer] = useState("");
  const [job, setJob] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const careers = [
    { value: "sistemas", label: "Ingeniería de Sistemas" },
    { value: "industrial", label: "Ingeniería Industrial" },
    { value: "administracion", label: "Administración" },
    { value: "derecho", label: "Derecho" },
    { value: "medicina", label: "Medicina" },
    { value: "economia", label: "Economía" },
  ];

  const jobs = [
    { value: "backend", label: "Desarrollador Backend" },
    { value: "frontend", label: "Desarrollador Frontend" },
    { value: "fullstack", label: "Desarrollador Full Stack" },
    { value: "analista", label: "Analista de Datos" },
    { value: "pm", label: "Project Manager" },
    { value: "devops", label: "DevOps Engineer" },
    { value: "qa", label: "QA Engineer" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validaciones
    if (!email || !password || !confirmPassword || !career || !job) {
      setError("Por favor, completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      // Registrar usuario con el servicio simulado
      await mockAuthService.register(email, password, career, job);
      
      console.log("Usuario registrado exitosamente");
      
      // Redirigir al dashboard
      navigate("/dashboard");
      
      // Recargar la página para actualizar el estado de autenticación
      window.location.reload();
    } catch (err: any) {
      console.error("Error en registro:", err);
      setError(err.message || "Error al registrar usuario. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return {
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
    handleSubmit,
  };
};
