import { Box } from "@mui/material";
import React from "react";
import ManageShopsContainer from "../containers/ManageShopsContainer";
import PageHeader from "../templates/PageHeader/PageHeader";

const ManageShopsPage = () => {
  return (
    <>
      <Box>
        <PageHeader
          header="Manage Shops"
          subHeader="Create or manage existing shops"
        />
        <ManageShopsContainer />
      </Box>
    </>
  );
};

export default ManageShopsPage;
