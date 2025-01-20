import { Button } from "@mui/material";
import React from "react";
import Colors from "../../../constants/colors";

const PrimaryBtn = (props) => {
  return (
    <Button
      sx={{
        backgroundColor: Colors.primary700,
        color: "#ffffff",
        "&:hover": {
          backgroundColor: "#0C3C3D",
        },
      }}
      variant="contained"
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default PrimaryBtn;
