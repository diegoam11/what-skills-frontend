import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { User, TrendingUp, Award, Target, BookOpen, Users } from 'lucide-react';

interface EmployabilityScore {
  overall_score: number;
  technical_score: number;
  experience_score: number;
  education_score: number;
  soft_skills_score: number;
}

interface Recommendation {
  title: string;
  description: string;
  category: string;
  priority: number;
  estimated_impact: number;
}

export const DashboardView: React.FC = () => {
  const [employabilityScore, setEmployabilityScore] = useState<EmployabilityScore | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API calls with mock data
    setTimeout(() => {
      setEmployabilityScore({
        overall_score: 74,
        technical_score: 82,
        experience_score: 65,
        education_score: 78,
        soft_skills_score: 71
      });

      setRecommendations([
        {
          title: "Learn Node.js",
          description: "Adding Node.js skills could significantly boost your backend development capabilities",
          category: "Technical Skills",
          priority: 1,
          estimated_impact: 8.5
        },
        {
          title: "Improve AWS Skills",
          description: "Cloud computing skills are in high demand. Consider AWS certification",
          category: "Technical Skills",
          priority: 1,
          estimated_impact: 9.0
        },
        {
          title: "Seek Internship Opportunities",
          description: "Gain practical experience through internships in your field",
          category: "Experience Building",
          priority: 2,
          estimated_impact: 7.5
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  const scoreData = [
    { name: 'Técnico', score: employabilityScore?.technical_score || 0, color: '#3B82F6' },
    { name: 'Experiencia', score: employabilityScore?.experience_score || 0, color: '#10B981' },
    { name: 'Educación', score: employabilityScore?.education_score || 0, color: '#8B5CF6' },
    { name: 'Habilidades Blandas', score: employabilityScore?.soft_skills_score || 0, color: '#F59E0B' },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard de Empleabilidad</h1>
              <p className="text-gray-600">Analiza tu potencial y mejora tu perfil profesional</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-700">Juan Pérez</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Score Card */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="h-8 w-8 text-blue-600 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800">Índice de Empleabilidad</h2>
            </div>
            <div className={`text-6xl font-bold mb-2 ${getScoreColor(employabilityScore?.overall_score || 0)}`}>
              {employabilityScore?.overall_score || 0}%
            </div>
            <p className="text-gray-600 mb-4">Tu nivel actual de empleabilidad</p>
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getScoreBackground(employabilityScore?.overall_score || 0)} ${getScoreColor(employabilityScore?.overall_score || 0)}`}>
              {(employabilityScore?.overall_score || 0) >= 80 ? 'Excelente' : 
               (employabilityScore?.overall_score || 0) >= 60 ? 'Bueno' : 'Necesita mejorar'}
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart className="h-5 w-5 mr-2 text-blue-600" />
              Desglose por Categorías
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scoreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Score Cards */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-600" />
                Puntuaciones Detalladas
              </h3>
              <div className="space-y-3">
                {scoreData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{item.name}</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${item.score}%`,
                            backgroundColor: item.color
                          }}
                        ></div>
                      </div>
                      <span className={`font-semibold ${getScoreColor(item.score)}`}>
                        {item.score}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">8</div>
                <div className="text-sm text-blue-700">Habilidades</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">3</div>
                <div className="text-sm text-green-700">Certificaciones</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            Recomendaciones Personalizadas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-800">{rec.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    rec.priority === 1 ? 'bg-red-100 text-red-800' :
                    rec.priority === 2 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {rec.priority === 1 ? 'Alta' : rec.priority === 2 ? 'Media' : 'Baja'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{rec.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{rec.category}</span>
                  <span className="text-sm font-medium text-blue-600">
                    +{rec.estimated_impact} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Actualizar Perfil
          </button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Ver Progreso
          </button>
          <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Explorar Oportunidades
          </button>
        </div>
      </main>
    </div>
  );
};
