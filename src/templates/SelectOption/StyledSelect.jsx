import { Select, styled } from "@mui/material";
import Theme from "../../styles/Theme.json";

export const StyledSelect = styled(Select)({
  color: Theme.palette.myTheme.common.white, // Text color
  backgroundColor: "transparent", // Background color
  borderColor: Theme.palette.myTheme.common.black, // Border color
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: Theme.palette.myTheme.common.white, // Outline border color
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: Theme.palette.myTheme.common.white, // Outline border color on hover
    color: "red",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: Theme.palette.myTheme.common.white, // Outline border color when focused
  },
  "&.MuiButtonBase": {
    backgroundColor: Theme.palette.myTheme.common.white,
  },
});
