import { removeApostrophes } from "../utils/stringUtils";
import api from "./Api";

const loanBookService = {
  currentShopId: localStorage.getItem("currentShopId"),
  test: "tesst",

  getAllLoanBooks: async () => {
    const response = await api.get("/loanbooks");
    return response.data;
  },

  getLoanBooksByShop: async () => {
    const response = await api.get(
      `/loanbookbyshop/${removeApostrophes(loanBookService.currentShopId)}`
    );
    console.log("ssress>", response);

    return response.data.filteredLoanBooks;
  },

  getLoansById: async (id) => {
    const response = await api.get(`/credit/${id}`);
    return response.data;
  },

  getLoansByCustomer: async (id) => {
    const response = await api.get(`/creditbycustomer/${id}`);
    return response.data.credit;
  },

  addLoanBooks: async (loanData) => {
    console.log("loanData", loanData);
    const response = await api.post("/addloanbook", loanData);
    return response.data;
  },

  updateLoanBooks: async (id, loanBookData) => {
    // console.log("id", id, loanBookData);

    const response = await api.put(`/updateloanbook/${id}`, loanBookData);
    console.log("resp", response);
    return response.data;
  },

  deleteLoanBooks: async (id) => {
    const response = await api.delete(`/deleteloanbook/${id}`);
    return response.data;
  },
};

export default loanBookService;
