import { Box } from "@mui/material";
import React from "react";
import ManageCheqPaymentsContainer from "../containers/ManageCheqPaymentsContainer";
import PageHeader from "../templates/PageHeader/PageHeader";

const ManageCheqPaymentsPage = () => {
  return (
    <>
      <Box>
        <PageHeader
          header="Manage Cheque Payments"
          subHeader="Create or manage existing Cheque payments"
        />
        <ManageCheqPaymentsContainer />
      </Box>
    </>
  );
};

export default ManageCheqPaymentsPage;
