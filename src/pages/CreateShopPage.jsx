import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NotAuthorizedPage from "../components/common/NotAuthorizedPage/NotAuthorizedPage";
import Colors from "../constants/colors";
import AuthContext from "../context/AuthContext";
import shopService from "../services/ShopService";

const CreateShopPage = () => {
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);
  const currentRole = role || localStorage.getItem("role");
  console.log("currentRole>>", currentRole);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await shopService.addShop(formData);
      setSuccess("Shop added successfully");
      navigate("/login");
      setFormData({
        name: "",
        address: "",
        phone: "",
        email: "",
      });
    } catch (error) {
      console.error("Error adding shop:", error);
      setError("Failed to add shop");
    }
  };

  return (
    <>
      {currentRole === "admin" ? (
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Paper
              elevation={6}
              sx={{
                padding: 4,
                borderRadius: 3,
                textAlign: "center",
                width: "100%",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Add Shop
              </Typography>
              <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" gap={2}>
                  <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                  />
                  {error && <Typography color="error">{error}</Typography>}
                  {success && (
                    <Typography color="primary">{success}</Typography>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      fontWeight: "bold",
                      borderRadius: 2,
                      bgcolor: Colors.secondary500,
                    }}
                  >
                    Add Shop
                  </Button>
                  <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    <Link to="/login"> Back to Login </Link>
                  </Typography>
                </Box>
              </form>
            </Paper>
          </Grid>
        </Container>
      ) : (
        <NotAuthorizedPage />
      )}
    </>
  );
};

export default CreateShopPage;
