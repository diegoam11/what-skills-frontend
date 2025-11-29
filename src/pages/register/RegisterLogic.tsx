import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/auth";
import { careers, jobs } from "../../utils/masterData";

export const RegisterLogic = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [career, setCareer] = useState("");
  const [job, setJob] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
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
      const careerLabel = careers.find(c => c.value === career)?.label || career;
      const jobLabel = jobs.find(j => j.value === job)?.label || job;

      await authService.register({
        email, 
        password, 
        career, 
        job,
        careerLabel, // label (ej. "Ingeniería de Sistemas")
        jobLabel,

        // Campos obligatorios en RegisterRequest que no pedimos en el form visual:
        first_name: email.split("@")[0], // Usamos la parte local del correo como nombre temporal
        last_name: "",
        university: "No especificada",
        semester: 1,
      });

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
