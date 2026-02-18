import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const parseValue = (value) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return value;
  }
};

const useGetShop = () => {
  const { currentShopName, currentShopId } = useContext(AuthContext);

  const shopId = currentShopId || localStorage.getItem("currentShopId");
  const shopName =
    currentShopName ||
    localStorage.getItem("currentShopName").replace(/"/g, "");

  console.log("shopId, shopName", shopId, shopName);

  return { currentShopId: shopId, currentShopName: shopName };
};

export default useGetShop;
