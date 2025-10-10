import { useEffect, useRef } from 'react';

// Datos de ejemplo.
const notifications = [
  { id: 1, text: "Nuevo empleo recomendado: Frontend Dev en Google.", time: "Hace 5 min" },
  { id: 2, text: "Tu índice de empleabilidad subió a 78. ¡Felicidades!", time: "Hace 2 horas" },
  { id: 3, text: "La habilidad 'Rust' ha aumentado su demanda. Considera aprenderla.", time: "Ayer" },
];

interface NotificationDropdownProps {
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Hook para cerrar el dropdown si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute top-14 right-0 mt-2 w-80 bg-white rounded-2xl shadow-lg border z-40 animate-fadeIn"
    >
      <div className="p-4 border-b">
        <h4 className="font-semibold text-gray-800">Notificaciones</h4>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map(notif => (
            <div key={notif.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
              <p className="text-sm text-gray-700">{notif.text}</p>
              <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
            </div>
          ))
        ) : (
          <p className="p-4 text-sm text-gray-500">No tienes notificaciones nuevas.</p>
        )}
      </div>
      <div className="p-2 bg-gray-50 text-center">
        <button className="text-sm font-medium text-green-600 hover:underline">
          Ver todas
        </button>
      </div>
    </div>
  );
};