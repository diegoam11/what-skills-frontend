interface Props {
  progress: number;
  sections: { label: string; completed: boolean }[];
}

export const ProfileCompletionCard: React.FC<Props> = ({
  progress,
  sections,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 w-full">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">
        Estado del perfil
      </h2>

      <p className="text-xs text-gray-500 mb-2">Completitud general</p>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
        <div
          className="bg-green-500 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="flex flex-col gap-3">
        {sections.map((s, i) => (
          <div
            key={i}
            className="flex items-center justify-between border rounded-xl px-3 py-2 text-sm"
          >
            <span>{s.label}</span>
            <button
              className={`px-3 py-1 rounded-md text-white text-xs ${
                s.completed ? "bg-gray-300" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {s.completed ? "Completado" : "Completar"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};