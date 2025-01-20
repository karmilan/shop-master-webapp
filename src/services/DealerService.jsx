import { removeApostrophes } from "../utils/stringUtils";
import api from "./Api";

const dealerService = {
  getAllDealers: async (token) => {
    const tokenVal = removeApostrophes(token);
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
      `/dealersbyshop/${removeApostrophes(currentShopId)}`
    );
    console.log("deal data", response);

    return response.data.dealer;
  },

  addDealer: async (dealerData) => {
    const currentShopId = localStorage.getItem("currentShopId");

    // Assign selected shop
    const dealerWithShop = {
      ...dealerData,
      shop: removeApostrophes(currentShopId),
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
