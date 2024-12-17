import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import shopService from "../../services/ShopService";

const Login = ({
  username,
  setUsername,
  password,
  setPassword,
  handleSubmit,
  shop,
  setShop,
}) => {
  // ----------fetch shops------------------
  // const [shop, setShop] = useState("");
  const [shopOptions, setShopOptions] = useState([]);
  const [selectedShopOptions, setSelectedShopOptions] = useState();

  useEffect(() => {
    // --------------------------------------get all shops function---------------------------------
    const fetchShops = async () => {
      try {
        const data = await shopService.getAllShops();
        const shopMappedData = data.map((item) => ({
          ...item,
          id: item._id,
        }));
        setShopOptions(shopMappedData);
      } catch (err) {
        console.log("Failed to fetch shops");
      }
    };

    fetchShops();
  }, []);

  const handleChange = (event) => {
    setSelectedShopOptions(event.target.value);
    console.log("event.target.value", event.target.value);
    setShop(event.target.value);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 3,
          textAlign: "center",
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "#0d1926" }}>
          Welcome Back!
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: 2,
          }}
        >
          <TextField
            label="User Name"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />

          {/* --------------------------------------------shop selections-------------------------------------- */}

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Shop</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedShopOptions}
              label="Shop"
              onChange={handleChange}
            >
              {shopOptions.map((shopOption) => (
                <MenuItem
                  sx={{ color: "black", backgroundColor: "transparent" }}
                  key={shopOption.id}
                  value={shopOption.id}
                >
                  {shopOption.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ fontWeight: "bold", borderRadius: 2, bgcolor: "#0d1926" }}
          >
            Log In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
