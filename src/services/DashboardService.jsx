import api from "./Api";

const dashboardService = {
    getStats: async (shopId) => {
        const response = await api.get(`/dashboard/stats${shopId ? `?shopId=${shopId}` : ""}`);
        return response.data;
    },

    getRecentActivity: async (shopId) => {
        const response = await api.get(`/dashboard/recent-activity${shopId ? `?shopId=${shopId}` : ""}`);
        return response.data;
    },

    getChartData: async (shopId) => {
        const response = await api.get(`/dashboard/chart-data${shopId ? `?shopId=${shopId}` : ""}`);
        return response.data;
    },
};

export default dashboardService;
