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

const AddLoanAccordion = ({ setRows, fetchLoans }) => {
  const [customer, setCustomer] = useState("");
  const [loanBook, setLoanBook] = useState("");

  const [amount, setAmount] = useState();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [totalLoanAmount, setTotalLoanAmount] = useState();
  const [customerCreditLimit, setCustomerCreditLimit] = useState();
  const [isExceeding, setIsExceeding] = useState(false);

  // ----------fetch loan books------------------

  const [loanBookOptions, setLoanBookOptions] = useState([]);
  const [selectedLoanBookOptions, setSelectedLoanBookOptions] = useState();

  useEffect(() => {
    // --------------------------------------get all loan books function---------------------------------
    const fetchLoanBooks = async () => {
      try {
        const data = await loanBookService.getLoanBooksByShop();
        const lbMappedData = data.map((item) => ({
          ...item,
          id: item._id,
        }));
        setLoanBookOptions(lbMappedData);
        console.log("lbmapdt", lbMappedData);
      } catch (err) {
        console.log("Failed to fetch loan books");
      }
    };

    fetchLoanBooks();
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
    setSelectedLoanBookOptions(event.target.value);
    setLoanBook(event.target.value);
    loanLimit(event.target.value);
  };
  // -------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!loanBook || !amount) {
      setError("All fields are required");
      return;
    }

    if (amount < 1) {
      setError("Enter valid Amount");
      return;
    }

    const currentLoanAmount = totalLoanAmount + Number(amount);
    if (currentLoanAmount > customerCreditLimit) {
      setError("Loan amount exceeds the credit limit!");
      return;
    }
    console.log("lo", loanBook, amount);

    try {
      const newLoan = { loanBook, amount };
      await loanService.addLoansByLoanBook(newLoan);
      console.log("lb>>>", loanBookOptions);

      setAmount("");
      setLoanBook(null);
      setSuccess("Loan added successfully");
      fetchLoans();
    } catch (err) {
      console.log("err", err);
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
                  <InputLabel sx={{ color: Colors.primary500 }}>
                    Loan Book
                  </InputLabel>
                  <StyledSelect
                    value={selectedLoanBookOptions}
                    label="Loan Book"
                    onChange={handleChange}
                  >
                    <MenuItem value="" disabled>
                      Select an option
                    </MenuItem>
                    {loanBookOptions.map((loanBookOption) => (
                      <MenuItem
                        sx={{
                          color: Colors.dark500,
                          backgroundColor: "transparent",
                        }}
                        key={loanBookOption.id}
                        value={loanBookOption.id}
                      >
                        {loanBookOption.lbId} - {loanBookOption.customer.name}
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
                  type="number"
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
            <CancelBtn>Cancel</CancelBtn>
            <PrimaryBtn disabled={isExceeding ? true : false} type="submit">
              Add Loan
            </PrimaryBtn>
          </AccordionActions>
        </StyledAccordion>
      </form>
    </>
  );
};

export default AddLoanAccordion;
