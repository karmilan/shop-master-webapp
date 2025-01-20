import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import customerService from "../../services/CustomerService";
import loanService from "../../services/LoanService";
import loanSettlementService from "../../services/LoanSettlementService";
import { _IconStyle } from "../../styles/GlobalStyles";
import { StyledAccordion } from "../../templates/Accordion/StyledAccordion";
import { StyledSelect } from "../../templates/SelectOption/StyledSelect";
import { StyledTextField } from "../../templates/TextField/StyledTextField";
import CancelBtn from "../common/CancelButton/CancelBtn";
import PrimaryBtn from "../common/PrimaryButton/PrimaryBtn";
import RadioButtonsGroup from "../common/RadioButtonsGroup/RadioButtonsGroup";

const AddLoanSettlementAccordion = ({ setRows, fetchLoanSettlements }) => {
  const [customer, setCustomer] = useState("");

  const [amount, setAmount] = useState();

  const [isFullAmountSettled, setIsFullAmountSettled] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [totalLoanAmount, setTotalLoanAmount] = useState();
  const [customerCreditLimit, setCustomerCreditLimit] = useState();
  const [isExceeding, setIsExceeding] = useState(false);
  const [settledAmounts, setSettledAmounts] = useState();

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

    /////////settled amounts for selected user
    const settledAmount =
      await loanSettlementService.getLoanSettlementsByCustomer(
        selectedCustomerId
      );

    /////////total settled amounts for selected user
    const totalSettledAmount = settledAmount.reduce(
      (sum, item) => sum + item.amount,
      0
    );
    console.log("set>>", totalSettledAmount);

    setSettledAmounts(totalSettledAmount);
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

    if (!customer || !amount) {
      setError("All fields are required");
      return;
    }

    if (amount < 1) {
      setError("Enter valid Amount");
      return;
    }

    if (totalLoanAmount <= settledAmounts) {
      setError("Already settled");
      return;
    }

    const currentSettleAmount = settledAmounts + Number(amount);
    console.log("currentSettleAmount", currentSettleAmount);
    console.log("settledAmounts", settledAmounts);

    if (totalLoanAmount < currentSettleAmount) {
      setError("Already settled");
      return;
    }

    try {
      const newLoan = { customer, amount, isFullAmountSettled };
      await loanSettlementService.addLoanSettlement(newLoan);
      setAmount("");
      // setCustomer(null);
      setIsFullAmountSettled(false);
      setSuccess("Loan added successfully");

      fetchLoanSettlements();
    } catch (err) {
      setError("Failed to add customer");
    }
  };
  console.log("RbValue", isFullAmountSettled);

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
            Add Loan Settlement
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
                    defaultValue="Cus"
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
                    <MenuItem value="" disabled>
                      Select an option
                    </MenuItem>
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

                {/* <StyledTextField
                  label="Amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  variant="outlined"
                  margin="normal"
                /> */}

                <>
                  <StyledTextField
                    value={`Total Loan Amount: ${
                      customer ? totalLoanAmount : "N/A"
                    }`}
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                    variant="outlined"
                    margin="normal"
                  />

                  <StyledTextField
                    value={`Settled Amount: ${
                      customer ? settledAmounts : "N/A"
                    }`}
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                    variant="outlined"
                    margin="normal"
                  />
                  {/* <Typography>
                      Total Loan Amount: {totalLoanAmount}
                    </Typography>
                    <Typography>Settled Amount: {settledAmounts}</Typography> */}
                </>
              </Grid>

              <Grid
                xs={12}
                md={6}
                container
                direction="column"
                // justifyContent={{ xs: "center", sm: "flex-start" }}
                justifyContent="start"
                alignItems="center"
              >
                <StyledTextField
                  label="Amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  variant="outlined"
                />

                <RadioButtonsGroup
                  rbLabl1="Settled"
                  rbVal1={true}
                  rbLabl2="Not Settled"
                  rbVal2={false}
                  rbValue={isFullAmountSettled}
                  setRbValue={setIsFullAmountSettled}
                />
              </Grid>
            </Grid>

            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{success}</Typography>}
          </AccordionDetails>
          <AccordionActions>
            <CancelBtn>Cancel</CancelBtn>
            <PrimaryBtn disabled={isExceeding ? true : false} type="submit">
              Add Loan Settlement
            </PrimaryBtn>
          </AccordionActions>
        </StyledAccordion>
      </form>
    </>
  );
};

export default AddLoanSettlementAccordion;
