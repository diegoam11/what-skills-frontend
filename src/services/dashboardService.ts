import api from '../api/axios';

export interface DashboardData {
    employability: {
        score: number;
        level: string;
        marketFit: number;
        profileDemand: number;
        recommendations: number;
    };
    profileCompletion: {
        progress: number;
        sections: { label: string; completed: boolean }[];
    };
    skills: { name: string; level: string; tag: string }[];
    improvements: { name: string; level: string; tag: string }[];
}

export const dashboardService = {
    getDashboardData: async (): Promise<DashboardData> => {
        // In a real app, this might be a single aggregate call or multiple calls
        // For now, we'll assume an endpoint that returns the aggregated dashboard data
        const response = await api.get<DashboardData>('/dashboard');
        return response.data;
    },
};
