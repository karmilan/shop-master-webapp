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
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import cashPaymentService from "../../services/CashPaymentService";
import dealerService from "../../services/DealerService";
import { _IconStyle } from "../../styles/GlobalStyles";
import { StyledAccordion } from "../../templates/Accordion/StyledAccordion";
import { StyledTextField } from "../../templates/TextField/StyledTextField";
import GenerateUniqueId from "../common/GenerateUniqueId/GenerateUniqueId";

const AddCashPaymentAccordion = ({ setRows }) => {
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
        const data = await dealerService.getAllDealers();
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
    const cashId = GenerateUniqueId("cash");
    setId(cashId);
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
      // setDealer("");
      // setSelectedDealerOptions("");
      const data = await cashPaymentService.getAllCashPayments();
      const mappedData = data.map((item) => ({
        ...item,
        id: item._id,
        cashPaymentId: item.id,
      }));

      setRows(mappedData);
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
                <StyledTextField
                  label="paymentDate"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  margin="normal"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid
                xs={6}
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
              >
                {/* <StyledTextField
                  label="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  margin="normal"
                  variant="outlined"
                /> */}

                <FormControl fullWidth size="small">
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
            <Button type="submit">Add Cash Payment</Button>
          </AccordionActions>
        </StyledAccordion>
      </form>
      {/* <Grid>
        {dealerOptions.map((item) => (
          <>
            <Grid key={item.id}>{item.id}</Grid>
          </>
        ))}
      </Grid> */}
      {selectedDealerOptions}
    </>
  );
};

export default AddCashPaymentAccordion;
