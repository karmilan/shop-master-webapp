import { removeApostrophes } from "../utils/stringUtils";
import api from "./Api";

const loanSettlementService = {
  getAllLoanSettlements: async () => {
    const response = await api.get("/loansettlements");
    return response.data;
  },

  getLoanSettlementById: async (id) => {
    const response = await api.get(`/loansettlement/${id}`);
    return response.data;
  },

  getLoanSettlementsByCustomer: async (id) => {
    const response = await api.get(`/loansettlementbycustomer/${id}`);
    return response.data.loanSettlement;
  },

  getLoanSettlementsByShop: async (id) => {
    const currentShopId = localStorage.getItem("currentShopId");
    const response = await api.get(
      `/loansettlementbyshop/${removeApostrophes(currentShopId)}`
    );
    return response.data.filteredLoanSettlements;
  },

  addLoanSettlement: async (loanSettlementData) => {
    const response = await api.post("/addloansettlement", loanSettlementData);
    return response.data;
  },

  updateLoanSettlement: async (id, loanSettlementData) => {
    const response = await api.put(
      `/updateloanSettlement/${id}`,
      loanSettlementData
    );
    return response.data;
  },

  deleteLoanSettlement: async (id) => {
    const response = await api.delete(`/deleteloansettlement/${id}`);
    return response.data;
  },
};

export default loanSettlementService;
