import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import shopService from "../../services/ShopService";
import { _IconStyle } from "../../styles/GlobalStyles";
import { StyledAccordion } from "../../templates/Accordion/StyledAccordion";
import { StyledTextField } from "../../templates/TextField/StyledTextField";

const AddShopAccordion = ({ setRows }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !address || !phone || !email) {
      setError("All fields are required");
      return;
    }

    try {
      const newShop = { name, address, phone, email };
      await shopService.addShop(newShop);
      setSuccess("Shop added successfully");
      setName("");
      setAddress("");
      setPhone("");
      setEmail("");
      const data = await shopService.getAllShops();
      const mappedData = data.map((item) => ({
        ...item,
        id: item._id,
      }));

      setRows(mappedData);
    } catch (err) {
      setError("Failed to add shop");
    }
  };

  return (
    <>
      {/* -------------------------------------------- */}
      <form onSubmit={handleSubmit}>
        <StyledAccordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={_IconStyle} />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            Accordion Actions
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid
                xs={6}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <StyledTextField
                  color="secondary"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
                <StyledTextField
                  label="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>

              <Grid
                xs={6}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <StyledTextField
                  label="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />

                <StyledTextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </Grid>

            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{success}</Typography>}
          </AccordionDetails>
          <AccordionActions>
            <Button>Cancel</Button>
            <Button type="submit">Add Shop</Button>
          </AccordionActions>
        </StyledAccordion>
      </form>
    </>
  );
};

export default AddShopAccordion;
