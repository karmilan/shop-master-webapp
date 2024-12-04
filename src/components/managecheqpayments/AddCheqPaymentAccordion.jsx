import { CalendarMonth } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import cheqPaymentService from "../../services/CheqPaymentService ";
import dealerService from "../../services/DealerService";
import { _IconStyle } from "../../styles/GlobalStyles";
import { StyledAccordion } from "../../templates/Accordion/StyledAccordion";
import { StyledTextField } from "../../templates/TextField/StyledTextField";
import GenerateUniqueId from "../common/GenerateUniqueId/GenerateUniqueId";
import GetYearMonthDate from "../common/GetYearMonthDate/GetYearMonthDate";

const AddCheqPaymentAccordion = ({ setRows }) => {
  const { token } = useContext(AuthContext);
  const currentToken = token || localStorage.getItem("token");

  const [id, setId] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [amount, setAmount] = useState("");
  const [chequeDate, setChequeDate] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [isCleared, setIsCleared] = useState(false);
  const [dealer, setDealer] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // ----------fetch dealers------------------

  const [dealerOptions, setDealerOptions] = useState([]);
  const [selectedDealerOptions, setSelectedDealerOptions] = useState();

  useEffect(() => {
    // --------------------------------------get all dealers function---------------------------------
    const fetchDealers = async () => {
      try {
        const data = await dealerService.getAllDealers(currentToken);
        const dealerMappedData = data.map((item) => ({
          ...item,
          id: item._id,
        }));
        setDealerOptions(dealerMappedData);
        console.log("mappedData", dealerMappedData);
      } catch (err) {
        console.log("Failed to fetch dealer");
      }
    };

    fetchDealers();
    const cheqId = GenerateUniqueId("cheq");
    setId(cheqId);
  }, []);

  const handleChange = (event) => {
    setSelectedDealerOptions(event.target.value);
    console.log("event.target.value", event.target.value);
    setDealer(event.target.value);
  };
  // -------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !id ||
      !chequeNumber ||
      !bankName ||
      !amount ||
      !chequeDate ||
      !paymentDate ||
      !dealer
    ) {
      setError("All fields are required");
      return;
    }

    try {
      const newCheqPayment = {
        id,
        chequeNumber,
        bankName,
        amount,
        chequeDate,
        paymentDate,
        dealer,
      };
      await cheqPaymentService.addCheqPayment(newCheqPayment);
      setSuccess("cheq payment added successfully");
      const cheqId = GenerateUniqueId("cheq");
      setId(cheqId);
      setChequeNumber("");
      setBankName("");
      setAmount("");
      setPaymentDate("");
      const data = await cheqPaymentService.getAllCheqPayments();
      const mappedData = data.map((item) => ({
        ...item,
        id: item._id,
        cheqPaymentId: item.id,
        paymentDate: GetYearMonthDate(item.paymentDate),
        chequeDate: GetYearMonthDate(item.chequeDate),
        dealer: item?.dealer?.name,
      }));

      setRows(mappedData);
    } catch (err) {
      setError("Failed to add cheq payment");
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
            Add Cheq Payment
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
                  value={id}
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
                  label="Cheque Number"
                  value={chequeNumber}
                  onChange={(e) => setChequeNumber(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />

                <StyledTextField
                  color="secondary"
                  label="Bank"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />

                <StyledTextField
                  color="secondary"
                  label="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
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
                  label="Cheque Date"
                  value={chequeDate}
                  onChange={(e) => setChequeDate(e.target.value)}
                  margin="normal"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarMonth style={{ color: "white" }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <StyledTextField
                  label="payment Date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  margin="normal"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarMonth style={{ color: "white" }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <FormControl sx={{ width: "90%", mt: 2 }} size="small">
                  <InputLabel sx={{ color: "white" }}>Dealer</InputLabel>
                  <Select
                    value={selectedDealerOptions}
                    label="Dealer"
                    onChange={handleChange}
                    sx={{
                      color: "white", // Text color
                      backgroundColor: "transparent", // Background color
                      borderColor: "black", // Border color
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white", // Outline border color
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white", // Outline border color on hover
                        color: "red",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white", // Outline border color when focused
                      },
                      "&.MuiButtonBase": {
                        backgroundColor: "white",
                      },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: "#112132", // Dropdown background color
                          color: "white", // Dropdown text color
                        },
                      },
                    }}
                  >
                    {dealerOptions.map((dealerOption) => (
                      <MenuItem
                        sx={{ color: "white", backgroundColor: "transparent" }}
                        key={dealerOption.id}
                        value={dealerOption.id}
                      >
                        {dealerOption.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{success}</Typography>}
          </AccordionDetails>
          <AccordionActions>
            <Button>Cancel</Button>
            <Button type="submit">Add Cheq Payment</Button>
          </AccordionActions>
        </StyledAccordion>
      </form>
    </>
  );
};

export default AddCheqPaymentAccordion;
