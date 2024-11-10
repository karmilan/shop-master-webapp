import api from "./Api";

const credPaymentService = {
  getAllCredPayments: async () => {
    const response = await api.get("/credpayments");
    return response.data;
  },

  getCredPaymentById: async (id) => {
    const response = await api.get(`/credpayment/${id}`);
    return response.data;
  },

  addCredPayment: async (credpaymentData) => {
    const response = await api.post("/addcredpayment", credpaymentData);
    return response.data;
  },

  updateCredPayment: async (id, credpaymentData) => {
    const response = await api.put(`/updatecredpayment/${id}`, credpaymentData);
    return response.data;
  },

  deleteCredPayment: async (id) => {
    const response = await api.delete(`/deletecredpayment/${id}`);
    return response.data;
  },
};

export default credPaymentService;
