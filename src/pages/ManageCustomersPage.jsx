import { Box } from "@mui/material";
import React from "react";
import ManageCustomersContainer from "../containers/ManageCustomersContainer";
import PageHeader from "../templates/PageHeader/PageHeader";

const ManageCustomersPage = () => {
  return (
    <>
      <Box>
        <PageHeader
          header="Manage Customers"
          subHeader="Create or manage existing Customers"
        />
        <ManageCustomersContainer />
      </Box>
    </>
  );
};

export default ManageCustomersPage;
