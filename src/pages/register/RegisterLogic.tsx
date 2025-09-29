import { useState } from "react";

export const RegisterLogic = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [career, setCareer] = useState("");
  const [job, setJob] = useState("");

  const careers = [
    { value: "sistemas", label: "Ingeniería de Sistemas" },
    { value: "industrial", label: "Ingeniería Industrial" },
    { value: "administracion", label: "Administración" },
    { value: "derecho", label: "Derecho" },
  ];

  const jobs = [
    { value: "backend", label: "Desarrollador Backend" },
    { value: "frontend", label: "Desarrollador Frontend" },
    { value: "analista", label: "Analista de Datos" },
    { value: "pm", label: "Project Manager" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, career, job });
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    career,
    setCareer,
    job,
    setJob,
    careers,
    jobs,
    handleSubmit,
  };
};
