import { Box } from "@mui/material";
import ManageProfitsContainer from "../containers/ManageProfitsContainer";
import PageHeader from "../templates/PageHeader/PageHeader";

const ManageProfitsPage = () => {
  return (
    <>
      <Box>
        <PageHeader
          header="Manage Daily Sales"
          subHeader="Create or manage daily sales"
        />
        <ManageProfitsContainer />
      </Box>
    </>
  );
};

export default ManageProfitsPage;
