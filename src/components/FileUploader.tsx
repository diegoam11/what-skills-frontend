import React, { useCallback, useState } from 'react';
import { UploadCloud, FileText, X, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FileUploaderProps {
    onUploadComplete: (data: any) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onUploadComplete }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragging(true);
        } else if (e.type === 'dragleave') {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const validateAndSetFile = (file: File) => {
        if (file.type === 'application/pdf' || file.type === 'text/plain') {
            setFile(file);
            setError(null);
            setSuccess(false);
        } else {
            setError('Por favor sube un archivo PDF o TXT.');
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        setError(null);

        try {
            // Simulate API delay for better UX if backend is fast or mocked
            await new Promise(resolve => setTimeout(resolve, 1500));

            // In a real scenario, we would use the actual service response
            // const data = await cvService.uploadCV(file);

            // Mock response for now since backend might not be ready
            const mockData = {
                skills: ["React", "Node.js", "Python"],
                experience_years: 3,
                recommendations: ["Aprender Docker", "Mejorar inglés"]
            };

            setSuccess(true);
            onUploadComplete(mockData);
            setFile(null);
        } catch (err) {
            setError('Error al subir el archivo. Inténtalo de nuevo.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="w-full">
            <AnimatePresence>
                {!file && !success ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ease-in-out ${isDragging
                            ? 'border-emerald-500 bg-emerald-50 scale-[1.02]'
                            : 'border-gray-300 hover:border-emerald-400 hover:bg-gray-50'
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleChange}
                            accept=".pdf,.txt"
                        />
                        <div className="flex flex-col items-center justify-center gap-3">
                            <div className="p-4 bg-emerald-100 text-emerald-600 rounded-full">
                                <UploadCloud size={32} />
                            </div>
                            <div>
                                <p className="text-lg font-medium text-gray-700">
                                    Arrastra tu CV aquí o <span className="text-emerald-600">explora</span>
                                </p>
                                <p className="text-sm text-gray-500 mt-1">Soporta PDF o TXT (Max 5MB)</p>
                            </div>
                        </div>
                    </motion.div>
                ) : success ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center"
                    >
                        <div className="flex flex-col items-center gap-3">
                            <CheckCircle size={48} className="text-emerald-500" />
                            <h3 className="text-xl font-semibold text-gray-800">¡Análisis Completado!</h3>
                            <p className="text-gray-600">Hemos procesado tu CV exitosamente.</p>
                            <button
                                onClick={() => setSuccess(false)}
                                className="mt-4 text-emerald-700 font-medium hover:underline"
                            >
                                Subir otro archivo
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                    <FileText size={24} />
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-gray-800 truncate max-w-[200px]">{file?.name}</p>
                                    <p className="text-sm text-gray-500">{(file!.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setFile(null)}
                                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                                disabled={uploading}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                                <X size={16} /> {error}
                            </div>
                        )}

                        <button
                            onClick={handleUpload}
                            disabled={uploading}
                            className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {uploading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" /> Analizando...
                                </>
                            ) : (
                                'Analizar CV con IA'
                            )}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
