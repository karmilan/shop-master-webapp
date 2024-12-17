import api from "./Api";

const cashPaymentService = {
  getAllCashPayments: async () => {
    const response = await api.get("/cashpayments");
    return response.data;
  },

  getCashPaymentById: async (id) => {
    const response = await api.get(`/cashpayment/${id}`);
    return response.data;
  },

  addCashPayment: async (cashpaymentData) => {
    const response = await api.post("/addcashpayment", cashpaymentData);
    return response.data;
  },

  getCashPaymentsByShop: async (id) => {
    const currentShopId = localStorage.getItem("currentShopId");
    const response = await api.get(
      `/cashpaymentsbyshop/${currentShopId.replace(/"/g, "")}`
    );
    console.log("ress>", response);
    return response.data.filteredCashPayment;
  },

  updateCashPayment: async (id, cashpaymentData) => {
    const response = await api.put(`/updatecashpayment/${id}`, cashpaymentData);
    return response.data;
  },

  deleteCashPayment: async (id) => {
    const response = await api.delete(`/deletecashpayment/${id}`);
    return response.data;
  },
};

export default cashPaymentService;
