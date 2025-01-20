import { Button } from "@mui/material";
import React from "react";
import Colors from "../../../constants/colors";

const CancelBtn = (props) => {
  return (
    <Button
      sx={{
        color: Colors.primary700,
        borderColor: Colors.primary700,
        "&:hover": {
          backgroundColor: "#e6f7f8",
        },
      }}
      variant="outlined"
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default CancelBtn;
