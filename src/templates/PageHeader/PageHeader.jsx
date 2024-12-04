import { Divider, Grid, Typography } from "@mui/material";
import Theme from "../../styles/Theme.json";

const PageHeader = ({ header, subHeader }) => {
  return (
    <>
      <Grid>
        <Typography
          textAlign={{ xs: "center", md: "justify" }}
          color={Theme.palette.myTheme.common.white}
          variant="h4"
        >
          {header}
        </Typography>
        <Typography
          textAlign={{ xs: "center", md: "justify" }}
          color={Theme.palette.myTheme.common.white}
          variant="subtitle1"
        >
          {subHeader}
        </Typography>
        <Divider sx={{ borderColor: Theme.palette.myTheme.common.white }} />
        <br></br>
      </Grid>
    </>
  );
};

export default PageHeader;
