import { Select, styled } from "@mui/material";
import Colors from "../../constants/colors";
import Theme from "../../styles/Theme.json";

export const StyledSelect = styled(Select)({
  color: Colors.primary500, // Text color
  backgroundColor: "transparent", // Background color
  borderColor: Colors.primary500, // Border color
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: Colors.primary500, // Outline border color
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: Colors.primary500, // Outline border color on hover
    color: "red",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: Colors.primary500, // Outline border color when focused
  },
  "&.MuiButtonBase": {
    backgroundColor: Theme.palette.myTheme.common.white,
  },
});
