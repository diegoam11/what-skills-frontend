import api from '../api/axios';

export interface AnalysisResult {
    skills: string[];
    experience_years: number;
    education: string[];
    recommendations: string[];
}

export const cvService = {
    uploadCV: async (file: File): Promise<AnalysisResult> => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post<AnalysisResult>('/analyze_cv', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    getRecommendations: async (skills: string[]) => {
        const response = await api.post('/recommend_skills', { skills });
        return response.data;
    },
};
