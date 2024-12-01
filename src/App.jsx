import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Layout from "./layouts/Layout";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const { user, token } = useContext(AuthContext);
  const currentToken = token || localStorage.getItem("token");

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="*"
          element={currentToken ? <Layout /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
};

export default App;
