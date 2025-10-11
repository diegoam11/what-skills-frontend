import React, { useState, useRef, useEffect } from "react";
// CAMBIO: Importamos los íconos X y ChevronDown de lucide-react
import { X, ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Selecciona una opción",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((opt) => opt.value === value)?.label || "";

  // Hook para cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full relative" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      {/* Contenedor principal que ahora también contiene los íconos */}
      <div className="relative">
        {/* Campo principal clickeable */}
        <div
          // CAMBIO: Se añade padding a la derecha (pr-12) para los íconos
          className={`w-full p-2.5 pr-12 border rounded-xl bg-white shadow-sm cursor-pointer transition-all ${
            isOpen
              ? "border-[#0FBB82] ring-2 ring-green-200"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={selectedLabel ? "text-gray-800" : "text-gray-500"}>
            {selectedLabel || placeholder}
          </span>
        </div>

        {/* CAMBIO: Contenedor para los íconos (Limpiar y Desplegar) */}
        <div className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center">
          {value && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Evita que el dropdown se abra/cierre al limpiar
                onChange("");
              }}
              className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              aria-label="Limpiar selección"
            >
              <X size={16} />
            </button>
          )}
          <ChevronDown
            size={20}
            className={`text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto animate-fadeIn">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              // CAMBIO: Reemplazado cn por template literal
              className={`px-4  py-2 m-1 cursor-pointer rounded-lg transition-colors ${
                opt.value === value
                  ? "bg-green-100 text-green-900 font-medium"
                  : "hover:bg-green-50"
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
