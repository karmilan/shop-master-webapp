import { Box } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import ManageAllPaymentsContainer from "../containers/ManageAllPaymentsContainer";
import PageHeader from "../templates/PageHeader/PageHeader";

const ManageAllPaymentsPage = () => {
  const location = useLocation();
  const { _dealerId } = location.state;
  return (
    <>
      <Box>
        <PageHeader
          header="Manage All Payments by Dealer"
          subHeader={`manage existing all payments for Dealer: ${_dealerId}`}
        />
        <ManageAllPaymentsContainer dealerId={_dealerId} />
      </Box>
    </>
  );
};

export default ManageAllPaymentsPage;
