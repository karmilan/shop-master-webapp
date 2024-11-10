import { Box } from "@mui/material";
import React from "react";
import ManageCredPaymentsContainer from "../containers/ManageCredPaymentsContainer";
import PageHeader from "../templates/PageHeader/PageHeader";

const ManageCredPaymentsPage = () => {
  return (
    <>
      <Box>
        <PageHeader
          header="Manage Credit Payments"
          subHeader="Create or manage existing Credit payments"
        />
        <ManageCredPaymentsContainer />
      </Box>
    </>
  );
};

export default ManageCredPaymentsPage;
