import { Box } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import ManageCashPaymentsContainer from "../containers/ManageCashPaymentsContainer";
import PageHeader from "../templates/PageHeader/PageHeader";

const ManageAllPaymentsPage = () => {
  const location = useLocation();
  const { dealerName } = location.state;
  console.log("iddd>>", dealerName);
  return (
    <>
      <Box>
        <PageHeader
          header="Manage All Payments by Dealer"
          subHeader={`manage existing all payments for Dealer: ${dealerName}`}
        />
        <ManageCashPaymentsContainer />
      </Box>
    </>
  );
};

export default ManageAllPaymentsPage;
