import { Accordion, styled } from "@mui/material";
import Colors from "../../constants/colors";
import Theme from "../../styles/Theme.json";

export const StyledAccordion = styled(Accordion)({
  // backgroundColor: Theme.palette.myTheme.secondary.content,
  // color: Theme.palette.myTheme.common.white,
  backgroundColor: Colors.light800,
  color: Colors.text500,
  fontWeight: "bold",
  border: `solid 1px ${Theme.palette.myTheme.common.white}`,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
});
