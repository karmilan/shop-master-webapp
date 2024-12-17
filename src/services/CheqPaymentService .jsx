import api from "./Api";

const cheqPaymentService = {
  getAllCheqPayments: async () => {
    const response = await api.get("/cheqpayments");
    return response.data;
  },

  getCheqPaymentById: async (id) => {
    const response = await api.get(`/cheqpayment/${id}`);
    return response.data;
  },

  addCheqPayment: async (cheqpaymentData) => {
    const response = await api.post("/addcheqpayment", cheqpaymentData);
    return response.data;
  },

  getCheqPaymentsByShop: async (id) => {
    const currentShopId = localStorage.getItem("currentShopId");
    const response = await api.get(
      `/cheqpaymentsbyshop/${currentShopId.replace(/"/g, "")}`
    );
    console.log("ress>", response);
    return response.data.filteredCheqPayment;
  },

  updateCheqPayment: async (id, cheqpaymentData) => {
    const response = await api.put(`/updatecheqpayment/${id}`, cheqpaymentData);
    return response.data;
  },

  deleteCheqPayment: async (id) => {
    const response = await api.delete(`/deletecheqpayment/${id}`);
    return response.data;
  },
};

export default cheqPaymentService;
