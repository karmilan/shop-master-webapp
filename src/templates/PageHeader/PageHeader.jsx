import { Divider, Grid, Typography } from "@mui/material";
import Theme from "../../styles/Theme.json";

const PageHeader = ({ header, subHeader }) => {
  return (
    <>
      <Grid>
        <Typography color={Theme.palette.myTheme.common.white} variant="h2">
          {header}
        </Typography>
        <Typography
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
