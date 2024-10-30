import api from "./Api";

const profitService = {
  getAllProfits: async () => {
    const response = await api.get("/profits");
    return response.data;
  },

  getProfitById: async (id) => {
    const response = await api.get(`/profits/${id}`);
    return response.data;
  },

  addProfit: async (profitData) => {
    const response = await api.post("/addprofit", profitData);
    return response.data;
  },

  updateProfit: async (id, profitData) => {
    const response = await api.put(`/updateprofit/${id}`, profitData);
    console.log("response>>>", response);
    return response.data;
  },

  deleteProfit: async (id) => {
    const response = await api.delete(`/deleteprofit/${id}`);
    return response.data;
  },
};

export default profitService;
