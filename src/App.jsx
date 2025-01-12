import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotAuthorizedPage from "./components/common/NotAuthorizedPage/NotAuthorizedPage";
import AuthContext from "./context/AuthContext";
import Layout from "./layouts/Layout";
import CreateShopPage from "./pages/CreateShopPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const { token } = useContext(AuthContext);
  const currentToken = token || localStorage.getItem("token");

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/createshop" element={<CreateShopPage />} />
        <Route path="/unauthorized" element={<NotAuthorizedPage />} />
        <Route
          path="*"
          element={currentToken ? <Layout /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
};

export default App;
