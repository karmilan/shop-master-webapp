import { CalendarMonth } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
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
import cashPaymentService from "../../services/CashPaymentService";
import dealerService from "../../services/DealerService";
import { _IconStyle } from "../../styles/GlobalStyles";
import { StyledAccordion } from "../../templates/Accordion/StyledAccordion";
import { StyledTextField } from "../../templates/TextField/StyledTextField";
import CancelBtn from "../common/CancelButton/CancelBtn";
import GenerateUniqueId from "../common/GenerateUniqueId/GenerateUniqueId";
import PrimaryBtn from "../common/PrimaryButton/PrimaryBtn";

const AddCashPaymentAccordion = ({ setRows, fetchCashPayments }) => {
  const { user, token } = useContext(AuthContext);
  const currentToken = token || localStorage.getItem("token");

  const [id, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  // const [phone, setPhone] = useState("");
  const [dealer, setDealer] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [uniqId, setUniqId] = useState("");

  // ----------fetch dealers------------------

  const [dealerOptions, setDealerOptions] = useState([]);
  const [selectedDealerOptions, setSelectedDealerOptions] = useState();

  useEffect(() => {
    // --------------------------------------get all dealers function---------------------------------
    const fetchDealers = async () => {
      try {
        // const data = await dealerService.getAllDealers(currentToken);
        const data = await dealerService.getDealerByShop();
        const dealerMappedData = data.map((item) => ({
          ...item,
          id: item._id,
        }));
        setDealerOptions(dealerMappedData);
      } catch (err) {
        console.log("Failed to fetch dealer");
      }
    };

    fetchDealers();
    const cashId = GenerateUniqueId("cash");
    setId(cashId);
  }, []);

  const handleChange = (event) => {
    setSelectedDealerOptions(event.target.value);
    setDealer(event.target.value);
  };
  // -------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!id || !amount || !paymentDate || !dealer) {
      console.log(id, amount, paymentDate, dealer);

      setError("All fields are required");
      return;
    }

    try {
      const newCashPayment = { id, amount, paymentDate, dealer };
      await cashPaymentService.addCashPayment(newCashPayment);
      setSuccess("cash payment added successfully");
      const cashId = GenerateUniqueId("cash");
      setId(cashId);
      setAmount("");
      setPaymentDate("");
      // const data = await cashPaymentService.getAllCashPayments();
      // const mappedData = data.map((item) => ({
      //   ...item,
      //   id: item._id,
      //   cashPaymentId: item.id,
      //   paymentDate: GetYearMonthDate(item.paymentDate),
      //   dealer: item?.dealer?.name,
      // }));

      // setRows(mappedData);
      fetchCashPayments();
    } catch (err) {
      setError("Failed to add cash payment");
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
            Add Cash Payment
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
                justifyContent="center"
                alignItems="center"
              >
                <FormControl sx={{ width: "90%" }} size="small">
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

                <StyledTextField
                  label="paymentDate"
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
              </Grid>
            </Grid>

            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{success}</Typography>}
          </AccordionDetails>
          <AccordionActions>
            <CancelBtn>Cancel</CancelBtn>
            <PrimaryBtn type="submit">Add Cash Payment</PrimaryBtn>
          </AccordionActions>
        </StyledAccordion>
      </form>
    </>
  );
};

export default AddCashPaymentAccordion;
