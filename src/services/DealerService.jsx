import api from "./Api";

const dealerService = {
  getAllDealers: async (token) => {
    const tokenVal = token.replace(/"/g, "");
    const response = await api.get("/dealers", {
      headers: { Authorization: `Bearer ${tokenVal}` },
    });
    console.log("response>>", response);

    return response.data;
  },

  getDealerById: async (id) => {
    const response = await api.get(`/dealers/${id}`);
    return response.data;
  },

  getDealerByShop: async (id) => {
    const currentShopId = localStorage.getItem("currentShopId");

    console.log("kkk>>>", id);

    const response = await api.get(
      `/dealersbyshop/${currentShopId.replace(/"/g, "")}`
    );
    console.log("deal data", response);

    return response.data.dealer;
  },

  addDealer: async (dealerData) => {
    const currentShopId = localStorage.getItem("currentShopId");

    // Assign selected shop
    const dealerWithShop = {
      ...dealerData,
      shop: currentShopId.replace(/"/g, ""),
    };

    const response = await api.post("/adddealer", dealerWithShop);
    return response.data;
  },

  updateDealer: async (id, dealerData) => {
    const response = await api.put(`/updatedealer/${id}`, dealerData);
    console.log("response>>>", response);
    return response.data;
  },

  deleteDealer: async (id) => {
    const response = await api.delete(`/deletedealer/${id}`);
    return response.data;
  },
};

export default dealerService;
