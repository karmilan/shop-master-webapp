import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import dealerService from "../../services/DealerService";
import { _IconStyle } from "../../styles/GlobalStyles";
import { StyledAccordion } from "../../templates/Accordion/StyledAccordion";
import { StyledTextField } from "../../templates/TextField/StyledTextField";
import GenerateUniqueId from "../common/GenerateUniqueId/GenerateUniqueId";

const AddDealerAccordion = ({ setRows, fetchDealers }) => {
  const { user, token } = useContext(AuthContext);
  const currentToken = token || localStorage.getItem("token");

  const [dealerId, setdealerId] = useState("");
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [creditLimit, setCreditLimit] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const uniqDealerId = GenerateUniqueId("dlr");
    setdealerId(uniqDealerId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!dealerId || !name || !contactNumber) {
      setError("All fields are required");
      return;
    }

    try {
      const newDealer = {
        dealerId,
        name,
        // address,
        contactNumber,
        // email,
        // creditLimit,
      };
      await dealerService.addDealer(newDealer);
      setSuccess("Dealer added successfully");
      const uniqDealerId = GenerateUniqueId("dlr");
      setdealerId(uniqDealerId);
      setName("");
      // setAddress("");
      setContactNumber("");
      // setEmail("");
      // setCreditLimit("");
      // const data = await dealerService.getAllDealers(currentToken);
      // const mappedData = data.map((item) => ({
      //   ...item,
      //   id: item._id,
      // }));

      // setRows(mappedData);
      fetchDealers();
    } catch (err) {
      setError("Failed to add dealer");
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
            Add Dealer
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid
                xs={12}
                md={6}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <StyledTextField
                  color="secondary"
                  label="Id"
                  value={dealerId}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                  margin="normal"
                  variant="outlined"
                />

                <StyledTextField
                  color="secondary"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
                {/* <StyledTextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  variant="outlined"
                /> */}
              </Grid>

              <Grid
                xs={12}
                md={6}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <StyledTextField
                  label="Phone"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
                {/* <StyledTextField
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />

                <StyledTextField
                  label="Credit Limit"
                  value={creditLimit}
                  onChange={(e) => setCreditLimit(e.target.value)}
                  margin="normal"
                  variant="outlined"
                /> */}
              </Grid>
            </Grid>

            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{success}</Typography>}
          </AccordionDetails>
          <AccordionActions>
            <Button>Cancel</Button>
            <Button type="submit">Add Dealer</Button>
          </AccordionActions>
        </StyledAccordion>
      </form>
    </>
  );
};

export default AddDealerAccordion;
