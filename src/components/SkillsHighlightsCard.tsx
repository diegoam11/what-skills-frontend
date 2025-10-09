interface Props {
  skills: { name: string; level: string; tag: string }[];
}

export const SkillsHighlightsCard: React.FC<Props> = ({ skills }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 w-full">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">
        Habilidades destacadas
      </h2>
      <div className="flex flex-col gap-3">
        {skills.map((s, i) => (
          <div
            key={i}
            className="flex justify-between items-center border rounded-xl px-3 py-2"
          >
            <div className="flex items-center gap-2 text-sm">
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md">
                {s.name}
              </span>
              <span className="text-gray-500">{s.level}</span>
            </div>
            <span className="bg-sky-100 text-sky-700 text-xs px-2 py-0.5 rounded-md">
              {s.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};