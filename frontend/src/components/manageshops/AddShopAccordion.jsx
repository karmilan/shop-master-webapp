import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import shopService from "../../services/ShopService";

const AddShopAccordion = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !location) {
      setError("All fields are required");
      return;
    }

    try {
      const newShop = { name, location };
      await shopService.addShop(newShop);
      setSuccess("Shop added successfully");
      setName("");
      setLocation("");
    } catch (err) {
      setError("Failed to add shop");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{ color: "#0F5052" }}>
        Add New Shop
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Add Shop
        </Button>
      </form>
    </Container>
  );
};

export default AddShopAccordion;
