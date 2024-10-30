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
    const response = await api.post("/addexpense", expenseData);
    return response.data;
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
