import api from "./Api";

const dealerService = {
  getAllDealers: async () => {
    const response = await api.get("/dealers");
    return response.data;
  },

  getDealerById: async (id) => {
    const response = await api.get(`/dealers/${id}`);
    return response.data;
  },

  addDealer: async (dealerData) => {
    const response = await api.post("/adddealer", dealerData);
    return response.data;
  },

  updateDealer: async (id, dealerData) => {
    const response = await api.put(`/updatedealer/${id}`, dealerData);
    console.log("response>>>", response);
    return response.data;
  },

  deleteDealer: async (id) => {
    const response = await api.delete(`/deletedealer/${id}`);
    return response.data;
  },
};

export default dealerService;
