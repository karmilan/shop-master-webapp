import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import employeeService from "../../services/EmployeeService";
import { _IconStyle } from "../../styles/GlobalStyles";
import { StyledAccordion } from "../../templates/Accordion/StyledAccordion";
import { StyledTextField } from "../../templates/TextField/StyledTextField";
import CancelBtn from "../common/CancelButton/CancelBtn";
import PrimaryBtn from "../common/PrimaryButton/PrimaryBtn";

const AddEmployeeAccordion = ({ setRows, fetchEmployees }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [shop, setShop] = useState("");

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
  //       console.log("mappedData", shopMappedData);
  //     } catch (err) {
  //       console.log("Failed to fetch shops");
  //     }
  //   };

  //   fetchShops();
  // }, []);
  // console.log("shopOptions", shopOptions);

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

    if (!name || !role || !address || !phone) {
      setError("All fields are required");
      return;
    }

    try {
      const newEmployee = { name, role, address, phone, shop };
      await employeeService.addEmployee(newEmployee);
      setSuccess("Employee added successfully");
      setName("");
      setRole("");
      setAddress("");
      setPhone("");
      setShop("");

      // ------------fetch data once added----------------------
      fetchEmployees();
    } catch (err) {
      setError("Failed to add employee");
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
            Add New Employee
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
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
                <StyledTextField
                  color="secondary"
                  label="Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
                <StyledTextField
                  label="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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

                {/* <FormControl sx={{ width: "90%" }} size="small">
                  <InputLabel sx={{ color: "white" }}>Shop</InputLabel>
                  <Select
                    value={selectedShopOptions}
                    label="Shop"
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
                    {shopOptions.map((shopOption) => (
                      <MenuItem
                        sx={{ color: "white", backgroundColor: "transparent" }}
                        key={shopOption.id}
                        value={shopOption.id}
                      >
                        {shopOption.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
              </Grid>
            </Grid>

            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{success}</Typography>}
          </AccordionDetails>
          <AccordionActions>
            <CancelBtn>Cancel</CancelBtn>
            <PrimaryBtn type="submit">Add Employee</PrimaryBtn>
          </AccordionActions>
        </StyledAccordion>
      </form>
      {/* <Grid>
        {shopOptions.map((item) => (
          <>
            <Grid key={item.id}>{item.name}</Grid>
          </>
        ))}
      </Grid> */}
    </>
  );
};

export default AddEmployeeAccordion;
