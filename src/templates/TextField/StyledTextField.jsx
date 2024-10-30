import { TextField, styled } from "@mui/material";
import Theme from "../../styles/Theme.json";

export const StyledTextField = styled(TextField)({
  width: "90%",
  "& label.Mui-focused": {
    color: "#c4b7e1",
  },
  // "& .MuiInput-underline:after": {
  //   borderBottomColor: "#B2BAC2",
  // },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: Theme.palette.myTheme.common.white,
    },
    "&:hover fieldset": {
      borderColor: "#c4b7e1",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#c4b7e1",
    },
  },
  "& .MuiInputLabel-root": {
    color: Theme.palette.myTheme.common.white,
  },
  "& .MuiInputBase-root": {
    color: Theme.palette.myTheme.common.white,
  },
});
