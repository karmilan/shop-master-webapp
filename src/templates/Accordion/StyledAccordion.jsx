import { Accordion, styled } from "@mui/material";
import Theme from "../../styles/Theme.json";

export const StyledAccordion = styled(Accordion)({
  backgroundColor: Theme.palette.myTheme.secondary.content,
  color: Theme.palette.myTheme.common.white,
  border: `solid 1px ${Theme.palette.myTheme.common.white}`,
});
