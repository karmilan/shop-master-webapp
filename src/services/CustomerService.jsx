import { removeApostrophes } from "../utils/stringUtils";
import api from "./Api";

const customerService = {
  getAllCustomers: async () => {
    const response = await api.get("/customers");
    return response.data;
  },

  getCustomerById: async (id) => {
    const response = await api.get(`/customer/${id}`);
    return response.data;
  },

  addCustomer: async (customerData) => {
    const currentShopId = localStorage.getItem("currentShopId");

    // Assign selected shop
    const customerWithShop = {
      ...customerData,
      shop: removeApostrophes(currentShopId),
    };
    const response = await api.post("/addcustomer", customerWithShop);
    return response.data;
  },

  getCustomersByShop: async (id) => {
    const currentShopId = localStorage.getItem("currentShopId");
    const response = await api.get(
      `/customersbyshop/${removeApostrophes(currentShopId)}`
    );
    return response.data.customer;
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
