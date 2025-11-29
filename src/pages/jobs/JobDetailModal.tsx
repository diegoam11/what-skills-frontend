import React from 'react';
import { X, CheckCircle, AlertCircle, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: number;
    postedDate: string;
    requiredSkills: string[];
    description: string;
}

interface JobDetailModalProps {
    job: Job;
    userSkills: string[];
    onClose: () => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, userSkills, onClose }) => {
    const missingSkills = job.requiredSkills.filter(skill => !userSkills.includes(skill));
    const matchedSkills = job.requiredSkills.filter(skill => userSkills.includes(skill));
    const matchPercentage = Math.round((matchedSkills.length / job.requiredSkills.length) * 100);

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
                            <p className="text-gray-500">{job.company} • {job.location}</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X size={24} className="text-gray-500" />
                        </button>
                    </div>

                    <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                        {/* Match Score */}
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className={`relative w-16 h-16 flex items-center justify-center rounded-full text-lg font-bold border-4 ${matchPercentage >= 70 ? 'border-emerald-500 text-emerald-700' :
                                matchPercentage >= 40 ? 'border-yellow-500 text-yellow-700' :
                                    'border-red-500 text-red-700'
                                }`}>
                                {matchPercentage}%
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Compatibilidad del Perfil</h4>
                                <p className="text-sm text-gray-500">
                                    {matchPercentage >= 70 ? '¡Tu perfil encaja muy bien!' : 'Te faltan algunas habilidades clave.'}
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h3>
                            <p className="text-gray-600 leading-relaxed">{job.description}</p>
                        </div>

                        {/* Skills Analysis */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-medium text-emerald-700 mb-3 flex items-center gap-2">
                                    <CheckCircle size={18} /> Habilidades que tienes
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {matchedSkills.length > 0 ? matchedSkills.map(skill => (
                                        <span key={skill} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-sm border border-emerald-100">
                                            {skill}
                                        </span>
                                    )) : <span className="text-gray-400 text-sm italic">Ninguna coincidencia</span>}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium text-red-700 mb-3 flex items-center gap-2">
                                    <AlertCircle size={18} /> Habilidades faltantes
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {missingSkills.length > 0 ? missingSkills.map(skill => (
                                        <span key={skill} className="px-3 py-1 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
                                            {skill}
                                        </span>
                                    )) : <span className="text-gray-400 text-sm italic">¡Tienes todo lo necesario!</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                        <button onClick={onClose} className="px-6 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-xl transition-colors">
                            Cerrar
                        </button>
                        <button className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all flex items-center gap-2">
                            <Briefcase size={18} />
                            Postular Ahora
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
