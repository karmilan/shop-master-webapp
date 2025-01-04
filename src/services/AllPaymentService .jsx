import api from "./Api";

const allPaymentsService = {
  getAllPaymentsByDealer: async (id) => {
    const response = await api.get(`/paymentsbydealer/${id}`);
    console.log("response>>>", response);

    return response.data;
  },
};

export default allPaymentsService;
