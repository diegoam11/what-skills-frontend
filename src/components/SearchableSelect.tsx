import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  label: string;
  options: Option[];
  value: string;
  // La interfaz ya está bien: acepta el segundo argumento opcional
  onChange: (value: string, label?: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Seleccionar...",
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);

  return (
    <div className="w-full" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <div className="relative">
        <input
          type="text"
          className="w-full p-2.5 pr-10 border border-gray-300 rounded-xl outline-none transition-all shadow-sm focus:border-[#0FBB82] focus:ring-2 focus:ring-green-200"
          placeholder={placeholder || "Escribe o selecciona..."}
          value={isOpen ? searchTerm : selectedOption?.label || ""}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />

        {value && !isOpen && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            aria-label="Limpiar selección"
          >
            <X size={18} />
          </button>
        )}

        {isOpen && (
          <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <div
                  key={opt.value}
                  // --- AQUÍ ESTABA EL DETALLE ---
                  onClick={() => {
                    // Pasamos el VALUE y también el LABEL
                    onChange(opt.value, opt.label); 
                    setIsOpen(false);
                  }}
                  // -----------------------------
                  className={`px-4 py-2 m-1 cursor-pointer rounded-lg transition-colors ${
                    value === opt.value
                      ? "bg-green-100 text-green-900 font-medium"
                      : "hover:bg-green-50"
                  }`}
                >
                  {opt.label}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">Sin resultados</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};