import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Colors from "../../constants/colors";
import customerService from "../../services/CustomerService";
import loanBookService from "../../services/LoanBookService";
import loanService from "../../services/LoanService";
import { _IconStyle } from "../../styles/GlobalStyles";
import { StyledAccordion } from "../../templates/Accordion/StyledAccordion";
import { StyledSelect } from "../../templates/SelectOption/StyledSelect";
import { StyledTextField } from "../../templates/TextField/StyledTextField";
import CancelBtn from "../common/CancelButton/CancelBtn";
import PrimaryBtn from "../common/PrimaryButton/PrimaryBtn";

const AddLoanBookAccordion = ({ setRows, fetchLoanBooks }) => {
  const [customer, setCustomer] = useState("");
  const [lbId, setLbId] = useState();
  const [creditLimit, setCreditLimit] = useState();
  const [outstandingBalance, setOutstandingBalance] = useState();
  const [status, setStatus] = useState();
  const [isApproved, setIsApproved] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  // const [amount, setAmount] = useState();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [totalLoanAmount, setTotalLoanAmount] = useState();
  const [customerCreditLimit, setCustomerCreditLimit] = useState();
  const [isExceeding, setIsExceeding] = useState(false);

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

  const loanLimit = async (selectedCustomerId) => {
    ////selected customer
    const selectedCust = await customerService.getCustomerById(
      selectedCustomerId
    );
    //////////Loans by customer
    const loansByCustomer = await loanService.getLoansByCustomer(
      selectedCustomerId
    );
    /////////total loan amount for selected user
    const totalLoanAmount = loansByCustomer.reduce(
      (sum, item) => sum + item.amount,
      0
    );
    setTotalLoanAmount(totalLoanAmount);
    setCustomerCreditLimit(selectedCust.customer.creditLimit);
    if (totalLoanAmount > selectedCust.customer.creditLimit) {
      setError("Loan amount exceeds the credit limit!");
      setIsExceeding(true);
    }
  };

  const handleChange = (event) => {
    setSelectedCustomerOptions(event.target.value);
    setCustomer(event.target.value);
    loanLimit(event.target.value);
  };
  // -------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!customer || !lbId || !creditLimit || !outstandingBalance || !status) {
      setError("All fields are required");
      return;
    }

    // if (amount < 1) {
    //   setError("Enter valid Amount");
    //   return;
    // }

    // const currentLoanAmount = totalLoanAmount + Number(amount);
    // if (currentLoanAmount > customerCreditLimit) {
    //   setError("Loan amount exceeds the credit limit!");
    //   return;
    // }

    try {
      const newLoan = {
        customer,
        lbId,
        creditLimit,
        outstandingBalance,
        status,
        isApproved,
        isClosed,
      };
      await loanBookService.addLoanBooks(newLoan);
      console.log("customerOptions>>>", customerOptions);

      // setAmount("");
      setCustomer(null);
      setSuccess("Loan book added successfully");

      fetchLoanBooks();
    } catch (err) {
      setError("Failed to add customer");
      console.log("Failed to add customer", err);
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
            Add Loan Book
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
                  <InputLabel sx={{ color: Colors.primary500 }}>
                    Customer
                  </InputLabel>
                  <StyledSelect
                    value={selectedCustomerOptions}
                    label="Customer"
                    onChange={handleChange}
                  >
                    <MenuItem value="" disabled>
                      Select an option
                    </MenuItem>
                    {customerOptions.map((customerOption) => (
                      <MenuItem
                        sx={{
                          color: Colors.dark500,
                          backgroundColor: "transparent",
                        }}
                        key={customerOption.id}
                        value={customerOption.id}
                      >
                        {customerOption.name}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                </FormControl>

                <StyledTextField
                  label="ID"
                  margin="normal"
                  value={lbId}
                  onChange={(e) => setLbId(e.target.value)}
                  variant="outlined"
                />

                <StyledTextField
                  label="Credit Limit"
                  margin="normal"
                  value={creditLimit}
                  onChange={(e) => setCreditLimit(e.target.value)}
                  variant="outlined"
                />
              </Grid>

              <Grid
                xs={12}
                md={6}
                container
                direction="column"
                justifyContent={{ xs: "center", md: "flex-start" }}
                alignItems="center"
              >
                <FormControl sx={{ width: "90%" }} size="small">
                  <InputLabel sx={{ color: Colors.primary500 }}>
                    Status
                  </InputLabel>
                  <StyledSelect
                    label="Status"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <MenuItem value="" disabled>
                      Select an option
                    </MenuItem>

                    <MenuItem
                      value="active"
                      sx={{
                        color: Colors.dark500,
                        backgroundColor: "transparent",
                      }}
                    >
                      Active
                    </MenuItem>
                    <MenuItem
                      value="inactive"
                      sx={{
                        color: Colors.dark500,
                        backgroundColor: "transparent",
                      }}
                    >
                      Inactive
                    </MenuItem>
                  </StyledSelect>
                </FormControl>

                <StyledTextField
                  label="outstanding Balance"
                  margin="normal"
                  value={outstandingBalance}
                  onChange={(e) => setOutstandingBalance(e.target.value)}
                  variant="outlined"
                />

                <Grid container width="90%">
                  <FormControlLabel
                    label="Is Approved"
                    sx={{ "&.MuiTypography-root": { fontSize: 20 } }}
                    control={
                      <Checkbox
                        checked={isApproved}
                        onChange={(e) => setIsApproved(e.target.checked)}
                        sx={{
                          "&.Mui-checked": {
                            color: Colors.primary500,
                          },
                          "& .MuiSvgIcon-root": { fontSize: 30 },
                        }}
                      />
                    }
                  />
                </Grid>
              </Grid>
            </Grid>

            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{success}</Typography>}
          </AccordionDetails>
          <AccordionActions>
            <CancelBtn>Cancel</CancelBtn>
            <PrimaryBtn disabled={isExceeding ? true : false} type="submit">
              Add Loan Book
            </PrimaryBtn>
          </AccordionActions>
        </StyledAccordion>
      </form>
    </>
  );
};

export default AddLoanBookAccordion;
