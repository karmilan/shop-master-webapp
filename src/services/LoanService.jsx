import { removeApostrophes } from "../utils/stringUtils";
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

  getLoansByCustomer: async (id) => {
    const response = await api.get(`/creditbycustomer/${id}`);
    return response.data.credit;
  },

  getLoansByLoanBook: async (id) => {
    const response = await api.get(`/creditbyloanbook/${id}`);
    return response.data.credit;
  },

  getLoansByShop: async (id) => {
    const currentShopId = localStorage.getItem("currentShopId");
    console.log("currentShopId", currentShopId);
    const response = await api.get(
      `/creditbyshop/${removeApostrophes(currentShopId)}`
    );
    console.log("loan data", response.data);
    return response.data.filteredCredits;
  },

  addLoans: async (loanData) => {
    const response = await api.post("/addcredit", loanData);
    return response.data;
  },

  addLoansByLoanBook: async (loanData) => {
    console.log("loandata", loanData);
    const response = await api.post("/addcreditforloanbook", loanData);
    console.log("ress>", response);
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
