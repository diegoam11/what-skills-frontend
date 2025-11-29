import React, { useState, useMemo } from 'react';
import { Search, MapPin, DollarSign, Calendar } from 'lucide-react';
import mockJobs from '../../data/mockJobs.json';
import { JobDetailModal } from './JobDetailModal';

// Mock user skills for matching logic (in a real app, this comes from context/store)
const USER_SKILLS = ["React", "TypeScript", "Python", "SQL"];

export const JobsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<typeof mockJobs[0] | null>(null);
  const [salaryFilter, setSalaryFilter] = useState<number>(0);

  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSalary = job.salary >= salaryFilter;
      return matchesSearch && matchesSalary;
    });
  }, [searchTerm, salaryFilter]);

  const getMatchPercentage = (requiredSkills: string[]) => {
    const matched = requiredSkills.filter(skill => USER_SKILLS.includes(skill));
    return Math.round((matched.length / requiredSkills.length) * 100);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Búsqueda de Empleos</h1>
          <p className="text-gray-500">Encuentra tu próxima oportunidad laboral</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por cargo o empresa..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <DollarSign className="text-gray-400" size={20} />
          <select
            className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            value={salaryFilter}
            onChange={(e) => setSalaryFilter(Number(e.target.value))}
          >
            <option value={0}>Cualquier Salario</option>
            <option value={2000}>Min. $2000</option>
            <option value={4000}>Min. $4000</option>
            <option value={6000}>Min. $6000</option>
          </select>
        </div>
      </div>

      {/* Job List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredJobs.map(job => {
          const match = getMatchPercentage(job.requiredSkills);
          return (
            <div
              key={job.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden group"
              onClick={() => setSelectedJob(job)}
            >
              <div className={`absolute top-0 right-0 w-1 h-full ${match >= 70 ? 'bg-emerald-500' : match >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} />

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">{job.title}</h3>
                  <p className="text-gray-500 font-medium">{job.company}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${match >= 70 ? 'bg-emerald-100 text-emerald-700' :
                  match >= 40 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                  {match}% Match
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign size={16} />
                  ${job.salary}/mes
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  {job.postedDate}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {job.requiredSkills.map(skill => (
                  <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          userSkills={USER_SKILLS}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
};