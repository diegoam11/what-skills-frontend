import React from "react";
import { UserProfileLogic } from "./UserProfileLogic";
import { InputText } from "../../components/InputText";
import { InputNumber } from "../../components/InputNumber";
import { Select } from "../../components/Select";
import { SearchableSelect } from "../../components/SearchableSelect";

export const UserProfileView: React.FC = () => {
  const {
    firstName,
    lastName,
    university,
    career,
    graduationYear,
    academicLevel,
    desiredPosition,
    industries,
    setFirstName,
    setLastName,
    setUniversity,
    setCareer,
    setGraduationYear,
    setAcademicLevel,
    setDesiredPosition,
    setIndustries,
    universities,
    careers,
    academicLevels,
    positions,
    industryOptions,
    handleSubmit,
  } = UserProfileLogic();

  return (
    <div className="h-full w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow-lg space-y-8"
      >
        {/* 1️⃣ Datos Personales y Académicos */}
        <section>
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Datos Personales y Académicos
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputText
              label="Nombres"
              value={firstName}
              onChange={setFirstName}
            />
            <InputText
              label="Apellidos"
              value={lastName}
              onChange={setLastName}
            />
            <SearchableSelect
              label="Universidad / Instituto"
              options={universities}
              value={university}
              onChange={setUniversity}
            />
            <SearchableSelect
              label="Carrera o especialidad"
              options={careers}
              value={career}
              onChange={setCareer}
            />
            <InputNumber
              label="Año de egreso"
              value={graduationYear}
              onChange={setGraduationYear}
            />
            <Select
              label="Nivel académico"
              options={academicLevels}
              value={academicLevel}
              onChange={setAcademicLevel}
            />
          </div>
        </section>

        {/* 2️⃣ Objetivos Profesionales */}
        <section>
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Objetivos Profesionales
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchableSelect
              label="Puesto laboral que desea conseguir"
              options={positions}
              value={desiredPosition}
              onChange={setDesiredPosition}
            />
            <SearchableSelect
              label="Áreas o industrias de interés"
              options={industryOptions}
              value={industries}
              onChange={setIndustries}
            />
          </div>
        </section>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="px-6 w-full py-2 bg-[#0FBB82] text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-sm cursor-pointer"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};
