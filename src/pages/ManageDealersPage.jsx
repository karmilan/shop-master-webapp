import { Box } from "@mui/material";
import React from "react";
import ManageDealersContainer from "../containers/ManageDealersContainer";
import PageHeader from "../templates/PageHeader/PageHeader";

const ManageDealersPage = () => {
  return (
    <>
      <Box>
        <PageHeader
          header="Manage Dealers"
          subHeader="Create or manage existing Dealers"
        />
        <ManageDealersContainer />
      </Box>
    </>
  );
};

export default ManageDealersPage;
