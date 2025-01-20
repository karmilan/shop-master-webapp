import { removeApostrophes } from "../utils/stringUtils";
import api from "./Api";

const expenseService = {
  getAllExpenses: async () => {
    const response = await api.get("/expenses");
    return response.data;
  },

  getExpenseById: async (id) => {
    const response = await api.get(`/expenses/${id}`);
    return response.data;
  },

  addExpense: async (expenseData) => {
    const currentShopId = localStorage.getItem("currentShopId");

    // Assign selected shop
    const expenseWithShop = {
      ...expenseData,
      shop: removeApostrophes(currentShopId),
    };
    console.log("expenseWithShop", expenseWithShop);
    const response = await api.post("/addexpense", expenseWithShop);
    console.log("response", response);

    return response.data;
  },

  getExpensesByShop: async (id) => {
    const currentShopId = localStorage.getItem("currentShopId");
    const response = await api.get(
      `/expensesbyshop/${removeApostrophes(currentShopId)}`
    );
    return response.data.expense;
  },

  updateExpense: async (id, expenseData) => {
    const response = await api.put(`/updateexpense/${id}`, expenseData);
    console.log("response>>>", response);
    return response.data;
  },

  deleteExpense: async (id) => {
    const response = await api.delete(`/deleteexpense/${id}`);
    return response.data;
  },
};

export default expenseService;
