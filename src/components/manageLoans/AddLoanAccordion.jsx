import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import customerService from "../../services/CustomerService";
import loanService from "../../services/LoanService";
import { _IconStyle } from "../../styles/GlobalStyles";
import { StyledAccordion } from "../../templates/Accordion/StyledAccordion";
import { StyledSelect } from "../../templates/SelectOption/StyledSelect";
import { StyledTextField } from "../../templates/TextField/StyledTextField";

const AddLoanAccordion = ({ setRows, fetchLoans }) => {
  const [customer, setCustomer] = useState("");

  const [amount, setAmount] = useState();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ----------fetch customers------------------

  const [customerOptions, setCustomerOptions] = useState([]);
  const [selectedCustomerOptions, setSelectedCustomerOptions] = useState();

  useEffect(() => {
    // --------------------------------------get all customers function---------------------------------
    const fetchCustomers = async () => {
      try {
        // const data = await customerService.getAllCustomers();
        const data = await customerService.getCustomersByShop();
        const customerMappedData = data.map((item) => ({
          ...item,
          id: item._id,
        }));
        setCustomerOptions(customerMappedData);
      } catch (err) {
        console.log("Failed to fetch customers");
      }
    };

    fetchCustomers();
  }, []);

  const handleChange = (event) => {
    setSelectedCustomerOptions(event.target.value);
    console.log("event.target.value", event.target.value);
    setCustomer(event.target.value);
  };
  // -------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!customer || !amount) {
      setError("All fields are required");
      return;
    }

    try {
      const newLoan = { customer, amount };
      await loanService.addLoans(newLoan);
      setSuccess("Loan added successfully");
      setCustomer("");
      setAmount();
      // const data = await loanService.getAllLoans();
      // const mappedData = data.map((item) => ({
      //   ...item,
      //   id: item._id,
      //   customer: item.customer ? item.customer.name : "null",
      // }));

      // setRows(mappedData);
      fetchLoans();
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
            Add Loan
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
                <FormControl sx={{ width: "90%" }} size="small">
                  <InputLabel sx={{ color: "white" }}>Customer</InputLabel>
                  <StyledSelect
                    value={selectedCustomerOptions}
                    label="Customer"
                    onChange={handleChange}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: "#112132", // Dropdown background color
                          color: "white", // Dropdown text color
                        },
                      },
                    }}
                  >
                    {customerOptions.map((customerOption) => (
                      <MenuItem
                        sx={{ color: "white", backgroundColor: "transparent" }}
                        key={customerOption.id}
                        value={customerOption.id}
                      >
                        {customerOption.name}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                </FormControl>
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
                  label="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{success}</Typography>}
          </AccordionDetails>
          <AccordionActions>
            <Button>Cancel</Button>
            <Button type="submit">Add Loan</Button>
          </AccordionActions>
        </StyledAccordion>
      </form>
    </>
  );
};

export default AddLoanAccordion;
