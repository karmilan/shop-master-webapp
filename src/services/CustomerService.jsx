import api from "./Api";

const customerService = {
  getAllCustomers: async () => {
    const response = await api.get("/customers");
    return response.data;
  },

  getCustomerById: async (id) => {
    const response = await api.get(`/customers/${id}`);
    return response.data;
  },

  addCustomer: async (customerData) => {
    const response = await api.post("/addcustomer", customerData);
    return response.data;
  },

  updateCustomer: async (id, customerData) => {
    const response = await api.put(`/updatecustomer/${id}`, customerData);
    console.log("response>>>", response);
    return response.data;
  },

  deleteCustomer: async (id) => {
    const response = await api.delete(`/deletecustomer/${id}`);
    return response.data;
  },
};

export default customerService;
