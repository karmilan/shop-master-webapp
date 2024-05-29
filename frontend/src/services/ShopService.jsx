import api from "./Api";

const shopService = {
  getAllShops: async () => {
    const response = await api.get("/shops");
    return response.data;
  },

  getShopById: async (id) => {
    const response = await api.get(`/shops/${id}`);
    return response.data;
  },

  addShop: async (shopData) => {
    const response = await api.post("/addshop", shopData);
    return response.data;
  },

  updateShop: async (id, shopData) => {
    const response = await api.put(`/shops/${id}`, shopData);
    return response.data;
  },

  deleteShop: async (id) => {
    const response = await api.delete(`/shops/${id}`);
    return response.data;
  },
};

export default shopService;
