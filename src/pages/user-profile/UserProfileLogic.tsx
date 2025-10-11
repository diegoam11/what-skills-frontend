import { useState } from "react";

export const UserProfileLogic = () => {
  // --- Estados para Datos Personales y Académicos ---
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [university, setUniversity] = useState("");
  const [career, setCareer] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [academicLevel, setAcademicLevel] = useState("");

  // --- Estados para Objetivos Profesionales ---
  const [desiredPosition, setDesiredPosition] = useState("");
  const [industries, setIndustries] = useState("");

  // --- Opciones para los Selects ---
  const universities = [
    { value: "upc", label: "UPC" },
    { value: "pucp", label: "PUCP" },
    { value: "uni", label: "UNI" },
  ];

  const careers = [
    { value: "sistemas", label: "Ingeniería de Sistemas" },
    { value: "industrial", label: "Ingeniería Industrial" },
  ];

  const academicLevels = [
    { value: "pregrado", label: "Pregrado" },
    { value: "bachiller", label: "Bachiller" },
    { value: "maestria", label: "Maestría" },
    { value: "doctorado", label: "Doctorado" },
  ];

  const positions = [
    { value: "backend", label: "Desarrollador Backend" },
    { value: "frontend", label: "Desarrollador Frontend" },
    { value: "analista", label: "Analista de Datos" },
  ];

  const industryOptions = [
    { value: "fintech", label: "Fintech" },
    { value: "educacion", label: "Educación" },
    { value: "salud", label: "Salud" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // El console.log ahora solo muestra los datos que se usan
    console.log({
      firstName,
      lastName,
      university,
      career,
      graduationYear,
      academicLevel,
      desiredPosition,
      industries,
    });
  };

  return {
    // Data
    firstName,
    lastName,
    university,
    career,
    graduationYear,
    academicLevel,
    desiredPosition,
    industries,

    // Setters
    setFirstName,
    setLastName,
    setUniversity,
    setCareer,
    setGraduationYear,
    setAcademicLevel,
    setDesiredPosition,
    setIndustries,

    // Options
    universities,
    careers,
    academicLevels,
    positions,
    industryOptions,

    // Handler
    handleSubmit,
  };
};
