import { Box } from "@mui/material";
import React from "react";
import ManageLoanBookContainer from "../containers/ManageLoanBookContainer";
import PageHeader from "../templates/PageHeader/PageHeader";

const ManageLoanBookPage = () => {
  return (
    <>
      <Box>
        <PageHeader
          header="Manage Loan Books"
          subHeader="Create or manage existing loan books"
        />
        <ManageLoanBookContainer />
      </Box>
    </>
  );
};

export default ManageLoanBookPage;
