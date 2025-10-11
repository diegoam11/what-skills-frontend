interface Props {
  improvements: { name: string; level: string; tag: string }[];
}

export const ImprovementGapsCard: React.FC<Props> = ({ improvements }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 w-full">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">
        Brechas a mejorar
      </h2>
      <div className="flex flex-col gap-3">
        {improvements.map((i, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center border rounded-xl px-3 py-2"
          >
            <div className="flex items-center gap-2 text-sm">
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md">
                {i.name}
              </span>
              <span className="text-gray-500">{i.level}</span>
            </div>
            <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-md">
              {i.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};