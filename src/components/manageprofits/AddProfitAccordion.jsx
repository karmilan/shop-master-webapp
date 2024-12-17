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
import profitService from "../../services/ProfitService";
import { _IconStyle } from "../../styles/GlobalStyles";
import { StyledAccordion } from "../../templates/Accordion/StyledAccordion";
import { StyledTextField } from "../../templates/TextField/StyledTextField";

const AddProfitAccordion = ({ setRows, fetchProfits }) => {
  const [shop, setShop] = useState("");

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ----------fetch shops------------------

  const [shopOptions, setShopOptions] = useState([]);
  const [selectedShopOptions, setSelectedShopOptions] = useState();

  // useEffect(() => {
  //   // --------------------------------------get all shops function---------------------------------
  //   const fetchShops = async () => {
  //     try {
  //       const data = await shopService.getAllShops();
  //       const shopMappedData = data.map((item) => ({
  //         ...item,
  //         id: item._id,
  //       }));
  //       setShopOptions(shopMappedData);
  //     } catch (err) {
  //       console.log("Failed to fetch shops");
  //     }
  //   };

  //   fetchShops();
  // }, []);

  // const handleChange = (event) => {
  //   setSelectedShopOptions(event.target.value);
  //   console.log("event.target.value", event.target.value);
  //   setShop(event.target.value);
  // };
  // -------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!amount || !date || !description) {
      setError("All fields are required");
      return;
    }

    try {
      const newProfit = { shop, amount, date, description };
      await profitService.addProfit(newProfit);
      setSuccess("Profit added successfully");
      setShop("");
      setAmount("");
      setDate("");
      setDescription("");
      // const data = await profitService.getAllProfits();
      // const mappedData = data.map((item) => ({
      //   ...item,
      //   id: item._id,
      //   shop: item.shop ? item.shop.name : "null",
      //   date: GetYearMonth(item.date),
      // }));

      // ------------fetch data once added----------------------

      fetchProfits();
      // setRows(mappedData);
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
            Add Profit
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
                {/* <FormControl sx={{ width: "90%" }} size="small">
                  <InputLabel sx={{ color: "white" }}>Shop</InputLabel>
                  <StyledSelect
                    value={selectedShopOptions}
                    label="Shop"
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
                    {shopOptions.map((shopOption) => (
                      <MenuItem
                        sx={{ color: "white", backgroundColor: "transparent" }}
                        key={shopOption.id}
                        value={shopOption.id}
                      >
                        {shopOption.name}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                </FormControl> */}

                <StyledTextField
                  label="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />

                <StyledTextField
                  label="Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  variant="outlined"
                />
              </Grid>

              <Grid
                xs={12}
                md={6}
                container
                direction="column"
                justifyContent="start"
                alignItems="center"
              >
                <StyledTextField
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
            <Button type="submit">Add Profit</Button>
          </AccordionActions>
        </StyledAccordion>
      </form>
    </>
  );
};

export default AddProfitAccordion;
