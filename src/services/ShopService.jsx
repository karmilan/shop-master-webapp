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
    const response = await api.put(`/updateshop/${id}`, shopData);
    console.log("response>>>", response);
    return response.data;
  },

  deleteShop: async (id) => {
    const response = await api.delete(`/deleteshop/${id}`);
    return response.data;
  },
};

export default shopService;
