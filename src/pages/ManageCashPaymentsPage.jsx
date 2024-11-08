import { Box } from "@mui/material";
import React from "react";
import ManageCashPaymentsContainer from "../containers/ManageCashPaymentsContainer";
import PageHeader from "../templates/PageHeader/PageHeader";

const ManageCashPaymentsPage = () => {
  return (
    <>
      <Box>
        <PageHeader
          header="Manage Cash Payments"
          subHeader="Create or manage existing cash payments"
        />
        <ManageCashPaymentsContainer />
      </Box>
    </>
  );
};

export default ManageCashPaymentsPage;
