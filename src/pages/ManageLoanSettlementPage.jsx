import { Box } from "@mui/material";
import React from "react";
import ManageLoanSettlementsContainer from "../containers/ManageLoanSettlementsContainer";
import PageHeader from "../templates/PageHeader/PageHeader";

const ManageLoanSettlementPage = () => {
  return (
    <>
      <Box>
        <PageHeader
          header="Manage settlements"
          subHeader={`manage existing all Loan settlements`}
        />
        <ManageLoanSettlementsContainer />
      </Box>
    </>
  );
};

export default ManageLoanSettlementPage;
