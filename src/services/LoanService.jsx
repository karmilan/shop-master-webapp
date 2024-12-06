import api from "./Api";

const loanService = {
  getAllLoans: async () => {
    const response = await api.get("/credits");
    return response.data;
  },

  getLoansById: async (id) => {
    const response = await api.get(`/credit/${id}`);
    return response.data;
  },

  addLoans: async (loanData) => {
    const response = await api.post("/addcredit", loanData);
    return response.data;
  },

  updateLoans: async (id, loanData) => {
    const response = await api.put(`/updatecredit/${id}`, loanData);
    return response.data;
  },

  deleteLoans: async (id) => {
    const response = await api.delete(`/deletecredit/${id}`);
    return response.data;
  },
};

export default loanService;
