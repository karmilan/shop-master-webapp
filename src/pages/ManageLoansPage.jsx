import { Box } from "@mui/material";
import React from "react";
import ManageLoansContainer from "../containers/ManageLoansContainer";
import PageHeader from "../templates/PageHeader/PageHeader";

const ManageLoansPage = () => {
  return (
    <>
      <Box>
        <PageHeader
          header="Manage Customer's Loans"
          subHeader="Create or manage existing loans"
        />
        <ManageLoansContainer />
      </Box>
    </>
  );
};

export default ManageLoansPage;
