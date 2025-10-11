import type { ReactNode } from "react";
import { X } from "lucide-react"; // CAMBIO: Importamos el ícono X de lucide-react

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md m-4">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="w-full text-lg font-semibold text-gray-800 text-center">
            {title}
          </h3>

          {/* ================================================================== */}
          {/* CAMBIO PRINCIPAL: Reemplazamos el SVG manual por el componente <X> */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X size={24} />
          </button>
          {/* ================================================================== */}
        </div>

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
