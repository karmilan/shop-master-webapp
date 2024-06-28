import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { _Colors } from "./styles/GlobalStyles.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode sx={_Colors.commonBgColor}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
