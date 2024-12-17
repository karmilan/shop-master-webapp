import api from "./Api";

const allPaymentsService = {
  getAllPaymentsByDealer: async (id) => {
    const response = await api.get(`/allpaymentsbydealer/${id}`);
    return response.data;
  },
};

export default allPaymentsService;
