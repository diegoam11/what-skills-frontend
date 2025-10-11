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
    { value: "software", label: "Ingeniería de Software" },
    { value: "computacion", label: "Ciencia de la Computación" },
    { value: "industrial", label: "Ingeniería Industrial" },
    { value: "electronica", label: "Ingeniería Electrónica" },
    { value: "mecatronica", label: "Ingeniería Mecatrónica" },
    { value: "administracion", label: "Administración de Empresas" },
    { value: "marketing", label: "Marketing" },
    { value: "diseno_ux_ui", label: "Diseño UX/UI" },
    { value: "economia", label: "Economía" },
    { value: "otra", label: "Otra carrera" },
  ];

  const jobs = [
    { value: "frontend", label: "Desarrollador Frontend" },
    { value: "backend", label: "Desarrollador Backend" },
    { value: "fullstack", label: "Desarrollador Full-Stack" },
    { value: "devops", label: "Ingeniero DevOps / SRE" },
    { value: "qa", label: "Ingeniero de Calidad / QA" },
    { value: "analista_datos", label: "Analista de Datos" },
    {
      value: "cientifico_datos",
      label: "Científico de Datos (Data Scientist)",
    },
    { value: "ingeniero_datos", label: "Ingeniero de Datos (Data Engineer)" },
    { value: "disenador_ux_ui", label: "Diseñador UX/UI" },
    { value: "project_manager", label: "Jefe de Proyecto / Project Manager" },
    { value: "product_manager", label: "Product Manager" },
    { value: "scrum_master", label: "Scrum Master" },
    { value: "analista_negocios", label: "Analista de Negocios" },
    { value: "arquitecto_software", label: "Arquitecto de Software" },
    { value: "ciberseguridad", label: "Especialista en Ciberseguridad" },
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
      setError(
        err.message || "Error al registrar usuario. Intenta nuevamente."
      );
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
