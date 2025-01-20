import { TextField, styled } from "@mui/material";
import Colors from "../../constants/colors";

export const StyledTextField = styled((props) => (
  <TextField {...props} size="small" />
))({
  width: "90%",
  "& label.Mui-focused": {
    color: "#c4b7e1",
  },
  // "& .MuiInput-underline:after": {
  //   borderBottomColor: "#B2BAC2",
  // },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: Colors.text500,
    },
    "&:hover fieldset": {
      borderColor: "#c4b7e1",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#c4b7e1",
    },
  },
  "& .MuiInputLabel-root": {
    color: Colors.text500,
  },
  "& .MuiInputBase-root": {
    color: Colors.text500,
  },
  "& .MuiPickersDay-root": {
    backgroundColor: "#ffffff", // Sets the background of calendar dates to white
  },
});
