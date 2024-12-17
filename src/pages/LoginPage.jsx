import { useContext, useState } from "react";
import Login from "../components/Auth/Login";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [shop, setShop] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password, shop);
  };

  return (
    <div>
      <Login
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        shop={shop}
        setShop={setShop}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default LoginPage;
