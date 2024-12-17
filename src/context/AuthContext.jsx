// src/context/AuthContext.js
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [currentShopId, setCurrentShopId] = useState();
  const [currentShopName, setCurrentShopName] = useState();

  const navigate = useNavigate();

  const login = async (username, password, shop) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          username,
          password,
          shop,
        }
      );
      console.log("shop<><>", shop);

      setUser(response.data);
      setToken(response.data.token);
      setRole(response.data.user.role);
      setCurrentShopId(response.data.assignedShop._id);
      setCurrentShopName(response.data.assignedShop.name);

      navigate("/");

      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("role", JSON.stringify(response.data.user.role));

      localStorage.setItem(
        "currentShopId",
        JSON.stringify(response.data.assignedShop._id)
      );
      localStorage.setItem(
        "currentShopName",
        JSON.stringify(response.data.assignedShop.name)
      );

      console.log(response.data.assignedShop._id);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    localStorage.removeItem("currentShopId");
    localStorage.removeItem("currentShopName");
    navigate("/login");
  };
  const currentUser = user?.user;
  console.log("token>>>", token);
  console.log("role>>>", role);

  useEffect(() => {
    // logic to check if a user is already authenticated
    setUser(role || localStorage.getItem("role"));
    setToken(token || localStorage.getItem("token"));
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        currentUser,
        token,
        role,
        currentShopId,
        currentShopName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
