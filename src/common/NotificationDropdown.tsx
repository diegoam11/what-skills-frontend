import { useEffect, useRef } from "react";

// Datos de ejemplo.
const notifications = [
  {
    id: 1,
    text: "Has completado tu perfil al 100%. ¡Buen trabajo!",
    time: "Hace 5 minutos",
  },
  {
    id: 2,
    text: "Tu índice de empleabilidad subió a 78. ¡Felicidades!",
    time: "Hace 2 horas",
  },
  {
    id: 3,
    text: "La habilidad 'Rust' ha aumentado su demanda. Considera aprenderla.",
    time: "Ayer",
  },
];

interface NotificationDropdownProps {
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  onClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Hook para cerrar el dropdown si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
      // CAMBIO: Añadido `border-gray-200` para un borde sutil y consistente.
      className="absolute top-14 right-0 mt-2 w-80 bg-white rounded-2xl shadow-lg border border-gray-200 z-40 animate-fadeIn"
    >
      {/* Encabezado */}
      <div className="p-4 border-b border-gray-200">
        <h4 className="font-semibold text-gray-800">Notificaciones</h4>
      </div>

      {/* Cuerpo con la lista de notificaciones */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div
              key={notif.id}
              // CAMBIOS: Borde a `border-gray-200` y hover a `hover:bg-green-50`.
              className="p-4 border-b border-gray-200 hover:bg-green-50 cursor-pointer transition-colors"
            >
              <p className="text-sm text-gray-700">{notif.text}</p>
              <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
            </div>
          ))
        ) : (
          <p className="p-4 text-sm text-gray-500">
            No tienes notificaciones nuevas.
          </p>
        )}
      </div>

      {/* Pie de página */}
      <div className="p-3 bg-gray-50 text-center border-t border-gray-200">
        <button className="text-sm font-medium text-[#0FBB82] hover:text-green-700 hover:underline cursor-pointer transition-colors">
          Ver todas
        </button>
      </div>
    </div>
  );
};