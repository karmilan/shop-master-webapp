import { Paper, styled } from "@mui/material";
import Theme from "../../styles/Theme.json";

export const StyledPaper = styled(Paper)({
  // backgroundColor: Theme.palette.myTheme.secondary.content,
  backgroundColor: Theme.palette.myTheme.primary.main,
  padding: "20px",
  borderRadius: "8px",
});
