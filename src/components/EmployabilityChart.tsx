import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#F87171", "#FBBF24", "#38BDF8"]; // Rojo, amarillo, azul

interface Props {
  score: number;
  level: string;
  marketFit: number;
  profileDemand: number;
  recommendations: number;
}

export const EmployabilityChart: React.FC<Props> = ({
  score,
  level,
  marketFit,
  profileDemand,
  recommendations,
}) => {
  const data = [
    { name: "Bajo", value: 20 },
    { name: "Medio", value: 30 },
    { name: "Alto", value: 50 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col w-full">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">
        Índice de empleabilidad
      </h2>

      <div className="flex items-center justify-between">
        <div className="relative flex items-center justify-center">
          <PieChart width={140} height={140}>
            <Pie
              data={data}
              innerRadius={45}
              outerRadius={60}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
          <div className="absolute text-center">
            <p className="text-3xl font-bold text-gray-800">{score}</p>
            <p className="text-sm text-gray-500">{level}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-sky-400"></span> Alto
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-400"></span> Medio
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-400"></span> Bajo
          </div>

          <div className="flex mt-4 flex-initial gap-[1rem]">
            <p className="text-gray-600 text-sm">Ajuste al mercado: {marketFit}</p>
            <p className="text-gray-600 text-sm">Demanda de perfil: {profileDemand}</p>
            <p className="text-gray-600 text-sm">Recomendaciones: {recommendations}</p>
          </div>
        </div>
      </div>
    </div>
  );
};