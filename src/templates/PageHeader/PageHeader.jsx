import { Divider, Grid, Typography } from "@mui/material";
import Colors from "../../constants/colors";

const PageHeader = ({ header, subHeader }) => {
  return (
    <>
      <Grid>
        <Typography
          textAlign={{ xs: "center", md: "justify" }}
          color={Colors.text500}
          variant="h4"
        >
          {header}
        </Typography>
        <Typography
          textAlign={{ xs: "center", md: "justify" }}
          color={Colors.text500}
          variant="subtitle1"
        >
          {subHeader}
        </Typography>
        <Divider sx={{ borderColor: Colors.text500 }} />
        <br></br>
      </Grid>
    </>
  );
};

export default PageHeader;
