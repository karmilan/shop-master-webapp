import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your actual base URL
  // baseURL: "https://sm-backend-dev-6c72b1664fd6.herokuapp.com/api/", // Replace with your actual base URL

  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
