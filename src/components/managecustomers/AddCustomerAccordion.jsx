import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import customerService from "../../services/CustomerService";
import { _IconStyle } from "../../styles/GlobalStyles";
import { StyledAccordion } from "../../templates/Accordion/StyledAccordion";
import { StyledTextField } from "../../templates/TextField/StyledTextField";
import CancelBtn from "../common/CancelButton/CancelBtn";
import GenerateUniqueId from "../common/GenerateUniqueId/GenerateUniqueId";
import PrimaryBtn from "../common/PrimaryButton/PrimaryBtn";

const AddCustomerAccordion = ({ setRows, fetchCustomers }) => {
  const [customerId, setCustomerId] = useState("");
  const [uniqId, setUniqId] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [creditLimit, setCreditLimit] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const cashId = GenerateUniqueId("cust");
    setCustomerId(cashId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!customerId || !name || !address || !phone || !email) {
      setError("All fields are required");
      return;
    }

    try {
      const newCustomer = {
        customerId,
        name,
        address,
        phone,
        email,
        creditLimit,
      };
      await customerService.addCustomer(newCustomer);
      setSuccess("Customer added successfully");
      const cashId = GenerateUniqueId("cust");
      setCustomerId(cashId);
      setName("");
      setAddress("");
      setPhone("");
      setEmail("");
      setCreditLimit("");

      // ------------fetch data once added----------------------
      fetchCustomers();
      // const data = await customerService.getAllCustomers();
      // const mappedData = data.map((item) => ({
      //   ...item,
      //   id: item._id,
      // }));

      // setRows(mappedData);
    } catch (err) {
      setError("Failed to add customer");
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
            Add New Customer
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
                  value={customerId}
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
                <StyledTextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>

              <Grid
                xs={12}
                md={6}
                container
                direction="column"
                justifyContent="flex-start"
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
                />
              </Grid>
            </Grid>

            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{success}</Typography>}
          </AccordionDetails>
          <AccordionActions>
            <CancelBtn>Cancel</CancelBtn>
            <PrimaryBtn type="submit">Add Customer</PrimaryBtn>
          </AccordionActions>
        </StyledAccordion>
      </form>
    </>
  );
};

export default AddCustomerAccordion;
