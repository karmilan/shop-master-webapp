import { removeApostrophes } from "../utils/stringUtils";
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

  getCredPaymentsByShop: async (id) => {
    const currentShopId = localStorage.getItem("currentShopId");
    const response = await api.get(
      `/credpaymentsbyshop/${removeApostrophes(currentShopId)}`
    );
    console.log("ress>", response);
    return response.data.filteredCredPayment;
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
