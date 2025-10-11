import { useState } from "react";

// Mantenemos esta función para leer los datos iniciales de forma segura
const getInitialUserData = () => {
  try {
    const data = localStorage.getItem("userData");
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Error al leer o parsear userData de localStorage:", error);
    return {};
  }
};

const initialUserData = getInitialUserData();

export const UserProfileLogic = () => {
  // --- Estados para Datos Personales y Académicos ---
  const [firstName, setFirstName] = useState(
    () => initialUserData.firstName || ""
  );
  const [lastName, setLastName] = useState(
    () => initialUserData.lastName || ""
  );
  const [university, setUniversity] = useState(
    () => initialUserData.university || ""
  );
  const [career, setCareer] = useState(() => initialUserData.career || "");
  const [graduationYear, setGraduationYear] = useState(
    () => initialUserData.graduationYear || ""
  );
  const [academicLevel, setAcademicLevel] = useState(
    () => initialUserData.academicLevel || ""
  );

  // --- Estados para Objetivos Profesionales ---
  const [desiredPosition, setDesiredPosition] = useState(
    () => initialUserData.job || ""
  );
  const [industries, setIndustries] = useState(
    () => initialUserData.industries || ""
  );

  // --- Opciones para los Selects (listas ampliadas) ---
  const universities = [
    { value: "pucp", label: "Pontificia Universidad Católica del Perú (PUCP)" },
    { value: "upc", label: "Universidad Peruana de Ciencias Aplicadas (UPC)" },
    { value: "uni", label: "Universidad Nacional de Ingeniería (UNI)" },
    {
      value: "unmsm",
      label: "Universidad Nacional Mayor de San Marcos (UNMSM)",
    },
    { value: "ulima", label: "Universidad de Lima" },
    { value: "up", label: "Universidad del Pacífico" },
    { value: "utec", label: "Universidad de Ingeniería y Tecnología (UTEC)" },
    { value: "esan", label: "Universidad ESAN" },
    { value: "usmp", label: "Universidad de San Martín de Porres (USMP)" },
    { value: "urp", label: "Universidad Ricardo Palma" },
    { value: "tecsup", label: "Tecsup" },
    { value: "senati", label: "Senati" },
    { value: "otra", label: "Otra institución" },
  ];

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

  const academicLevels = [
    { value: "estudiante", label: "Estudiante" },
    { value: "tecnico", label: "Técnico" },
    { value: "pregrado", label: "Pregrado (En curso)" },
    { value: "bachiller", label: "Bachiller" },
    { value: "titulado", label: "Titulado" },
    { value: "especializacion", label: "Diplomado / Especialización" },
    { value: "maestria", label: "Maestría" },
    { value: "doctorado", label: "Doctorado" },
  ];

  const positions = [
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

  const industryOptions = [
    { value: "ti_consultoria", label: "Consultoría TI" },
    { value: "software_saas", label: "Software / SaaS" },
    { value: "fintech", label: "Fintech" },
    { value: "banca_seguros", label: "Banca y Seguros" },
    { value: "retail_ecommerce", label: "Retail / E-commerce" },
    { value: "salud", label: "Salud (Healthtech)" },
    { value: "educacion", label: "Educación (Edutech)" },
    { value: "gobierno", label: "Gobierno / Sector Público" },
    { value: "telecomunicaciones", label: "Telecomunicaciones" },
    { value: "mineria", label: "Minería" },
    { value: "energia", label: "Energía" },
    { value: "logistica_transporte", label: "Logística y Transporte" },
    { value: "marketing_publicidad", label: "Marketing y Publicidad" },
    { value: "turismo_hoteleria", label: "Turismo y Hotelería" },
  ];

  // ==================================================================
  // CAMBIO PRINCIPAL: Lógica de guardado en `handleSubmit`
  // ==================================================================
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Obtenemos los datos actuales de localStorage para no perderlos
    const currentData = getInitialUserData();

    // 2. Creamos el objeto actualizado, combinando lo viejo y lo nuevo
    const updatedUserData = {
      ...currentData, // Mantiene los datos existentes (id, email, displayName)
      firstName,
      lastName,
      university,
      career, // Esto sobreescribirá la 'career' antigua si cambia
      graduationYear,
      academicLevel,
      job: desiredPosition, // Mantenemos la equivalencia job <-> desiredPosition
      industries,
    };

    // 3. Guardamos el objeto actualizado de vuelta en localStorage
    try {
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      alert("¡Perfil guardado exitosamente!"); // Feedback para el usuario
      console.log("Datos guardados en localStorage:", updatedUserData);
    } catch (error) {
      console.error("Error al guardar en localStorage:", error);
      alert("Hubo un error al guardar tu perfil.");
    }
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
