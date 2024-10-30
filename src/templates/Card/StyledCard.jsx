import { Card, styled } from "@mui/material";
import Theme from "../../styles/Theme.json";

export const StyledCard = styled(Card)({
  // backgroundColor: Theme.palette.myTheme.secondary.main,
  // backgroundColor: Theme.palette.myTheme.common.dark,
  // backgroundImage:
  //   "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
  backgroundColor: Theme.palette.myTheme.primary.main,
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  borderColor: "#304050",
});
